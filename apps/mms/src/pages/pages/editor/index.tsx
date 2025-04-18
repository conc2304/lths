import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tab, Tabs, Backdrop, CircularProgress, Dialog, DialogContent, Typography } from '@mui/material';
import { useBeforeUnload, useCopy, useNavigationBlocker, usePaste } from '@lths-mui/shared/ui-hooks';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import {
  PageDetail,
  useLazyGetComponentDetailQuery,
  useLazyGetPageDetailsQuery,
  useUpdatePageDetailsMutation,
  useUpdatePageStatusMutation,
  EnumValue,
  useLazyGetEnumListQuery,
  ComponentProps,
  transformUpdatePageDetailRequest,
  copyComponentToClipboard,
  useAppDispatch,
  removeComponentFromClipboard,
  EnumGroup,
  UseGetPageListQuery,
  getCopiedComponentFromStorage,
} from '@lths/features/mms/data-access';
import {
  PageAdapterProvider,
  PageConstraints,
  PageHeader,
  PageSettings,
  PageStatus,
  UnSavedPageAlert,
  NoConstraintAlert,
  useAlertActions,
  PasteComponentAlert,
} from '@lths/features/mms/ui-components';
import {
  BlockEditor,
  useEditorActions,
  EditorProvider,
  Callback,
  PageAutocompleteItemProps,
  AutocompleteOptionProps,
  ComponentProps as ComponentPropsUiEditor,
  PageAction,
} from '@lths/features/mms/ui-editor';
import { DialogActions, DialogTitle, toast } from '@lths/shared/ui-elements';
import { useLayoutActions } from '@lths/shared/ui-layouts';

import { ComponentModal } from '../../../components/pages/editor';
import AssetsModal from '../../../components/pages/editor/assets/connected-modal';
import TabPanel from '../tab-panel';

const StatusChangeModalData = {
  [PageStatus.PUBLISHED]: {
    title: 'Publish page now',
    description: 'Once you publish this page, it will be viewable on the mobile app.',
    action: 'PUBLISH',
    error: 'Failed to publish the page',
    success: 'Page has been Published Successfully.',
    status: PageStatus.PUBLISHED,
  },
  [PageStatus.UNPUBLISHED]: {
    title: 'Unublish page now',
    description: (
      <Typography maxWidth={'26rem'}>
        Once you unpublish this page, it will not be viewable on the mobile app and links to this page will become
        inactive.
      </Typography>
    ),
    action: 'UNPUBLISH',
    error: 'Failed to unpublish the page',
    success: 'Page has been Unpublished Successfully',
    status: PageStatus.UNPUBLISHED,
  },
};

const TabItems = {
  page_design: { value: 'page_design', label: 'PAGE DESIGN' },
  constraints: { value: 'constraints', label: 'CONSTRAINTS' },
  settings: { value: 'settings', label: 'SETTINGS' },
};
export function PageEditorTabs() {
  //api
  const { initEditor, addComponent, pasteComponent, components, data, updateExtended, hasUnsavedEdits } =
    useEditorActions();
  const { openAlert } = useAlertActions();
  const [getPageDetail, { isFetching: isFetchingPageDetail, data: pageDetailResponse }] = useLazyGetPageDetailsQuery();
  const [getPreviewPageDetail] = useLazyGetPageDetailsQuery();
  const [getEnumList] = useLazyGetEnumListQuery();
  const [updatePageStatus, { isLoading }] = useUpdatePageStatusMutation();
  const [updatePageDetails, { isLoading: isPageUpdating }] = useUpdatePageDetailsMutation();
  const [getDetail, { isFetching: isFetchingComponentDetail }] = useLazyGetComponentDetailQuery();
  const getPageList = UseGetPageListQuery();

  //state
  const [currentTab, setCurrentTab] = useState(TabItems.page_design.value);
  const [openModal, setOpenModal] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageCallback, setImageCallback] = useState(null);
  const [compCallback, setCompCallback] = useState(null);
  const [compModal, setCompModal] = useState({
    open: false,
    defaultCategory: null,
    showCategories: true,
  });
  const [isPageSaved, setIsPageSaved] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    description: '',
    action: '',
    status: '',
    error: '',
    success: '',
  });
  const [isConstraintAlertOpen, setIsConstraintAlertOpen] = useState(false);
  const [isPasteComponentAlertOpen, setIsPasteComponentAlertOpen] = useState(false);

  const dispatch = useAppDispatch();
  const [addIndex, setAddIndex] = useState(null);

  //route params
  const { pageId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const { showPrompt, confirmNavigation, cancelNavigation } = useNavigationBlocker(hasUnsavedEdits);

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = true;
  };

  useBeforeUnload(handleBeforeUnload, hasUnsavedEdits);

  //fetch params
  const page_data = data as PageDetail;

  const isVariantPage = page_data && page_data.default_page_id;

  // Breadcrumbs title
  const { setPageTitle } = useLayoutActions();

  const handleCopyEvent = () => {
    const targetedComponent = document.querySelector('[data-component-id]:hover') as HTMLElement;
    if (!targetedComponent) return;
    const componentId = targetedComponent.dataset.componentId;
    const selectedComponent = components.find((component) => component.__ui_id__ === componentId);
    dispatch(copyComponentToClipboard(selectedComponent));
    toast.add(`Copied ${selectedComponent.name} component to the clipboard`, { type: 'success' });
  };

  const handlePasteEvent = () => {
    const copiedComponent = getCopiedComponentFromStorage();
    copiedComponent && setIsPasteComponentAlertOpen(true);
  };

  useCopy(handleCopyEvent, [components]);
  usePaste(handlePasteEvent);

  useEffect(() => {
    if (page_data?.name) setPageTitle(page_data.name);
  }, [page_data?.name]);

  //side effects
  useEffect(() => {
    if (pageId) getPageDetail(pageId);
  }, [pageId]);

  useEffect(() => {
    if (pageDetailResponse) {
      const { data, success } = pageDetailResponse;
      if (success && data) initEditor(data);
      else toast.add('Page details could not be found', { type: 'error' });
    }
  }, [pageDetailResponse]);

  //modal events
  const handleSelectComponent = async (componentId: string) => {
    handleCloseCompModal();
    try {
      const response = await getDetail(componentId).unwrap();
      if (response && response.success && response.data) {
        if (compCallback) compCallback(response.data);
        else addComponent(response.data, addIndex);
      } else {
        toast.add('Component details could not be found', { type: 'error' });
      }
    } catch (error) {
      console.error('Error in fetching the component details', error);
      toast.add('Component details could not be found', { type: 'error' });
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (
      Object.values(TabItems)
        .map((tab) => tab.value)
        .includes(tabParam)
    ) {
      setCurrentTab(tabParam);
    } else {
      setCurrentTab(TabItems.page_design.value);
    }
  }, [location]);

  const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
    const tabURL = `${location.pathname}?tab=${newValue}`;
    navigate(tabURL);
  };

  const handleCloseCompModal = () => {
    setCompModal((prevState) => ({
      ...prevState,
      open: false,
    }));
    setCompCallback(null);
  };
  const handleCloseImageModal = () => {
    setImageModalOpen(false);
  };
  const handleAddComponent = (index?: number) => {
    setAddIndex(() => index);
    setCompModal({
      open: true,
      defaultCategory: null,
      showCategories: true,
    });
  };
  const handleAddImage = (callback: (url: string) => void) => {
    setImageCallback(() => callback);
    setImageModalOpen(true);
  };

  //TODO: API is not typed yet, so using any for now
  const handlAddAction = async (callback: (data) => void) => {
    try {
      const pageList = await getPageList();
      return callback(pageList);
    } catch (error) {
      console.error('Error in fetching the default page list', error);
      toast.add('Default page list could not be found.', { type: 'error' });
    }
  };

  const handleAddSocialIcon = async (callback: (data) => void) => {
    try {
      const response = await getEnumList('socialIcons').unwrap();
      if (response && response.success && response.data) return callback(response.data.enum_values);
      else {
        toast.add('Social icon list could not be found.', { type: 'error' });
        return callback([]);
      }
    } catch (error) {
      console.error('Error in fetching the social icon list', error);
      toast.add('Social icon list could not be found.', { type: 'error' });
    }
  };

  const handlAddQuickLinkIcons = async (callback: (data: AutocompleteOptionProps[]) => void) => {
    try {
      const response = await getEnumList(EnumGroup.ACTION_ICONS).unwrap();
      if (response && response.success && response.data)
        return callback(response.data.enum_values.map((o) => ({ label: o.name, value: o.value })));
      else {
        toast.add('Icon list could not be found.', { type: 'error' });
        return callback([]);
      }
    } catch (error) {
      console.error('Error in fetching the icon list', error);
      toast.add('Icon list could not be found.', { type: 'error' });
    }
  };

  const handleAddHeroCarouselComponent = async (callback: (data: ComponentProps) => void) => {
    setCompCallback(() => callback);
    setCompModal({
      open: true,
      defaultCategory: 'HERO',
      showCategories: false,
    });
  };

  const handlAddPageDetail = async (pageId: string, callback: (data: ComponentPropsUiEditor[]) => void) => {
    try {
      const response = await getPreviewPageDetail(pageId).unwrap();
      if (response && response.success && response.data) return callback(response.data.components);
      else {
        toast.add('Page Detail could not be found.', { type: 'error' });
        return callback([]);
      }
    } catch (error) {
      console.error('Error in fetching the Page Detail', error);
      toast.add('Page Detail could not be found.', { type: 'error' });
    }
  };

  const handleCopyComponent = (components: ComponentProps[], id: string, callback: (componentName: string) => void) => {
    const selectedComponent = components.find((component) => component.__ui_id__ === id);
    dispatch(copyComponentToClipboard(selectedComponent));
    return callback(selectedComponent.name);
  };

  function handlePropChange<T>(propName: string, callback: Callback<T>, props?: Record<string, unknown>): void {
    if (propName === 'image_url') {
      handleAddImage(callback as Callback<string>);
    } else if (propName === 'action') {
      handlAddAction(callback as Callback<PageAutocompleteItemProps[]>);
    } else if (propName === 'social_icon') {
      handleAddSocialIcon(callback as Callback<EnumValue>);
    } else if (propName === 'quickLinkIcons') {
      handlAddQuickLinkIcons(callback as Callback<AutocompleteOptionProps[]>);
    } else if (propName === 'pageDetail') {
      const pageId = (props.pageId as string) || '';
      handlAddPageDetail(pageId as string, callback as Callback<ComponentPropsUiEditor[]>);
    } else if (propName === 'hero_carousel_component_modal') {
      handleAddHeroCarouselComponent(callback as Callback<ComponentProps>);
    } else if (propName === 'copy_component') {
      const components = (props.components as ComponentProps[]) || [];
      const id = (props.id as string) || '';
      handleCopyComponent(components, id, callback as Callback<string>);
    }
  }

  const handleSelectImage = (url: string) => {
    imageCallback && imageCallback(url);
    setImageModalOpen(false);
  };

  const handleMenuItemSelect = async (status: string) => {
    const data = StatusChangeModalData[status];
    if (data) {
      setModalData(data);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdatePageStatus = async () => {
    try {
      if (modalData.status === PageStatus.PUBLISHED && page_data.default_page_id) {
        const { events, locations, user_segments } = page_data.constraints;
        const isConstraintsAdded = events.length > 0 || locations.length > 0 || user_segments.length > 0;
        if (!isConstraintsAdded) {
          setIsConstraintAlertOpen(true);
          setOpenModal(false);
          return;
        }
      }
      if (hasUnsavedEdits) {
        try {
          await handleUpdatePageDetails();
        } catch (error) {
          toast.add('Error in saving page details', { type: 'error' });
          console.error('Error in saving page details', error);
          return;
        }
      }
      const response = await updatePageStatus({
        page_id: pageId,
        status: modalData.status,
      }).unwrap();
      if (response && response.success && response.data) {
        initEditor(response.data);
        toast.add(modalData.success, { type: 'success' });
      } else {
        toast.add(modalData.error, { type: 'error' });
      }
    } catch (error) {
      console.error('Error in updating the page', error);
      toast.add(modalData.error, { type: 'error' });
    }
    setOpenModal(false);
  };

  const handleUpdatePageDetails = async () => {
    try {
      const updatedData = { ...page_data, components };

      const payload = transformUpdatePageDetailRequest(updatedData);

      const response = await updatePageDetails(payload).unwrap();

      if (response?.success) {
        if (!isPageSaved) {
          toast.add('Page details has been updated successfully', { type: 'success' });
        }
        initEditor(response?.data);
        setIsPageSaved(true);
      } else {
        toast.add('Failed to update the page details', { type: 'error' });
        setIsPageSaved(false);
      }
    } catch (error) {
      toast.add('Failed to update the page details', { type: 'error' });
      console.error('Error in updating page details', error.message);
      setIsPageSaved(false);
    }
  };

  // handlers
  const handleActionClick = (action: PageAction) => {
    const { page_id, name, default_page_id } = page_data;
    switch (action) {
      case PageAction.RENAME:
        openAlert(PageAction.RENAME, { page_id, name });
        break;
      case PageAction.DELETE:
        openAlert(PageAction.DELETE, { page_id, name });
        break;
      case PageAction.DUPLICATE:
        openAlert(PageAction.DUPLICATE, { page_id, name });
        break;
      case PageAction.PREVIEW:
        console.log('Not implemented: preview');
        break;
      case PageAction.COMPARISON:
        openAlert(PageAction.COMPARISON, { page_id, default_page_id });
        break;
      case PageAction.INSIGHTS:
        console.log('Not implemented: insights');
        break;
      case PageAction.SHARE:
        console.log('Not implemented: share');
        break;
    }
  };

  const handleSave = async () => {
    try {
      await handleUpdatePageDetails();
      cancelNavigation();
    } catch (error) {
      toast.add('Error in saving page details', { type: 'error' });
      console.error('Error in saving page details', error);
    }
  };

  const handleNoConstraintAlertClose = () => {
    setIsConstraintAlertOpen(false);
  };

  const handlePasteComponent = () => {
    handlePasteComponentAlertClose();
    const copiedComponent = getCopiedComponentFromStorage();
    pasteComponent(copiedComponent);
    toast.add(`The copied ${copiedComponent.name} component has been added to this page.`, { type: 'success' });
    dispatch(removeComponentFromClipboard());
  };

  const handlePasteComponentAlertClose = () => {
    setIsPasteComponentAlertOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader
        title={page_data?.name}
        status={page_data?.status}
        onStatusChange={handleMenuItemSelect}
        onActionClick={handleActionClick}
        onUpdate={handleUpdatePageDetails}
        isPageUpdating={isPageUpdating}
        lastUpdatedOn={page_data?.created_on || page_data?.updated_on}
        type={page_data?.type}
      />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label={TabItems.page_design.label} value={TabItems.page_design.value} />
          {isVariantPage && <Tab label={TabItems.constraints.label} value={TabItems.constraints.value} />}
          <Tab label={TabItems.settings.label} value={TabItems.settings.value} />
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={TabItems.page_design.value} currentTab={currentTab}>
          <BlockEditor onAddComponent={handleAddComponent} onPropChange={handlePropChange} />
          <ComponentModal
            onClose={handleCloseCompModal}
            variant="basic"
            onSelect={handleSelectComponent}
            {...compModal}
          />
          <AssetsModal open={imageModalOpen} onClose={handleCloseImageModal} onSelect={handleSelectImage} />
        </TabPanel>
        {isVariantPage && (
          <TabPanel value={TabItems.constraints.value} currentTab={currentTab}>
            <PageConstraints />
          </TabPanel>
        )}

        <TabPanel value={TabItems.settings.value} currentTab={currentTab}>
          <PageSettings data={page_data} onUpdateSettings={updateExtended} />
        </TabPanel>
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle title={modalData.title} />
        <DialogContent>
          <Typography variant="body1" color="text.primary" flexWrap="wrap">
            {modalData.description}
          </Typography>
        </DialogContent>
        <DialogActions
          confirmText={modalData.action}
          onConfirm={handleUpdatePageStatus}
          onCancel={handleCloseModal}
          isSubmitting={isLoading}
        />
      </Dialog>

      <Backdrop open={isFetchingComponentDetail || isFetchingPageDetail} sx={{ zIndex: 2 }}>
        <CircularProgress />
      </Backdrop>

      <UnSavedPageAlert
        isOpen={showPrompt}
        onCancel={confirmNavigation}
        onSave={handleSave}
        isLoading={isPageUpdating}
      />
      <NoConstraintAlert
        isOpen={isConstraintAlertOpen}
        handleConfirm={handleNoConstraintAlertClose}
        handleClose={handleNoConstraintAlertClose}
      />
      <PasteComponentAlert
        isOpen={isPasteComponentAlertOpen}
        handleConfirm={handlePasteComponent}
        handleClose={handlePasteComponentAlertClose}
      />
    </Box>
  );
}

const ConnectedPageEditor = () => {
  const initialState: PageDetail = {
    _id: null,
    page_id: null,
    type: null,
    name: null,
    description: null,
    is_variant: null,
    status: null,
    components_schema: [],
    default_page_id: null,
    default_page_name: null,
    constraints: {
      _id: null,
      events: [],
      locations: [],
      user_segments: [],
    },
    components: [],
  };

  return (
    <EditorProvider<PageDetail> initialValue={initialState}>
      <PageAdapterProvider>
        <PageEditorTabs />
      </PageAdapterProvider>
    </EditorProvider>
  );
};
export default ConnectedPageEditor;
