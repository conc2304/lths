import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tab, Tabs, Button, Modal, Backdrop, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigationBlocker } from '@lths-mui/shared/ui-hooks';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import {
  PageDetail,
  useLazyGetComponentDetailQuery,
  useLazyGetDefaultPagesQuery,
  useLazyGetPageDetailsQuery,
  useUpdatePageDetailsMutation,
  useUpdatePageStatusMutation,
  EnumValue,
  useLazyGetEnumListQuery,
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
} from '@lths/features/mms/ui-components';
import {
  BlockEditor,
  useEditorActions,
  EditorProvider,
  Callback,
  AutocompleteItemProps,
  AutocompleteOptionProps,
  PageAction,
} from '@lths/features/mms/ui-editor';
import { useLayoutActions } from '@lths/shared/ui-layouts';

import { ComponentModal } from '../../../components/pages/editor';
import AssetsModal from '../../../components/pages/editor/assets/connected-modal';
import TabPanel from '../tab-panel';

const StatusChangeModalData = {
  [PageStatus.PUBLISHED]: {
    title: 'Are you sure you want to publish this page?',
    description: 'Once you publish this page, it will be accessible by app users',
    action: 'PUBLISH NOW',
    error: 'Failed to publish the page',
    success: 'Page has been Published Successfully.',
    status: PageStatus.PUBLISHED,
  },
  [PageStatus.UNPUBLISHED]: {
    title: 'Are you sure you want to unpublish this page?',
    description: 'This page will no longer appear on the app and all links to this page will become inactive.',
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
  const { initEditor, addComponent, components, data, updateExtended, hasUnsavedEdits } = useEditorActions();
  const { openAlert } = useAlertActions();
  const [getPageDetail] = useLazyGetPageDetailsQuery();
  const [getEnumList] = useLazyGetEnumListQuery();
  const [updatePageStatus, { isLoading }] = useUpdatePageStatusMutation();
  const [getDefaultPage] = useLazyGetDefaultPagesQuery();
  const [updatePageDetails, { isLoading: isPageUpdating }] = useUpdatePageDetailsMutation();
  const [getDetail, { isFetching: isFetchingComponentDetail }] = useLazyGetComponentDetailQuery();

  //state
  const [currentTab, setCurrentTab] = useState(TabItems.page_design.value);
  const [openModal, setOpenModal] = useState(false);
  const [compModalOpen, setCompModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageCallback, setImageCallback] = useState(null);
  const [modalData, setModalData] = useState({
    title: '',
    description: '',
    action: '',
    status: '',
    error: '',
    success: '',
  });
  const [isConstraintAlertOpen, setIsConstraintAlertOpen] = useState(false);

  //route params
  const { pageId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const { showPrompt, confirmNavigation, cancelNavigation } = useNavigationBlocker(hasUnsavedEdits);

  //fetch params
  const page_data = data as PageDetail;

  // Breadcrumbs title
  const { setPageTitle } = useLayoutActions();

  useEffect(() => {
    if (page_data?.name) setPageTitle(page_data.name);
  }, [page_data?.name]);

  //fetch
  const fetchPageDetail = async (pageId: string) => {
    const response = await getPageDetail(pageId);
    if (response.isSuccess) {
      const payload = response.data;
      if (payload?.success && payload?.data) initEditor(payload.data);
      else toast.success('Page details could not be found');
    }
  };

  //side effects
  useEffect(() => {
    if (pageId) fetchPageDetail(pageId);
  }, [pageId]);

  //modal events
  const handleSelectComponent = async (componentId: string) => {
    setCompModalOpen(false);
    const detail = await getDetail(componentId);
    if (detail?.isSuccess && detail?.data?.data) {
      addComponent(detail.data.data);
    } else {
      console.log('Failed to find component');
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
    setCompModalOpen(false);
  };
  const handleCloseImageModal = () => {
    setImageModalOpen(false);
  };
  const handleAddComponent = () => {
    setCompModalOpen(true);
  };
  const handleAddImage = (callback: (url: string) => void) => {
    setImageCallback(() => callback);
    setImageModalOpen(true);
  };

  //TODO: API is not typed yet, so using any for now
  const handlAddAction = async (callback: (data) => void) => {
    const response = await getDefaultPage();
    if (response.data?.data)
      return callback(response.data.data.map((o) => ({ label: o.name, value: o.page_id, type: o.type })));
  };

  const handleAddSocialIcon = async (callback: (data) => void) => {
    const response = await getEnumList('socialIcons').unwrap();
    if (response && response.success && response.data) return callback(response.data.enum_values);
    else return callback([]);
  };

  const handlAddQuickLinkIcons = async (callback: (data: AutocompleteOptionProps[]) => void) => {
    const response = await getEnumList('Icons').unwrap();
    if (response.data) return callback(response.data.enum_values.map((o) => ({ label: o.name, value: o.value })));
  };

  function handlePropChange<T>(propName: string, callback: Callback<T>): void {
    if (propName === 'image_url') {
      handleAddImage(callback as Callback<string>);
    } else if (propName === 'action') {
      handlAddAction(callback as Callback<AutocompleteItemProps>);
    } else if (propName === 'social_icon') {
      handleAddSocialIcon(callback as Callback<EnumValue>);
    } else if (propName === 'quickLinkIcons') {
      handlAddQuickLinkIcons(callback as Callback<AutocompleteOptionProps[]>);
    }
  }

  const handleSelectImage = (url: string) => {
    imageCallback && imageCallback(url);
    setImageModalOpen(false);
  };

  const handleMenuItemSelect = (status: string) => {
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
      const response = await updatePageStatus({
        page_id: pageId,
        status: modalData.status,
      }).unwrap();
      initEditor(response.data);
      toast.success(modalData.success);
    } catch (error) {
      console.error('Error in updating the page', error);
      toast.error(modalData.error);
    }
    setOpenModal(false);
  };

  const handleUpdatePageDetails = async () => {
    try {
      const updatedData = { ...page_data, components };

      const response = await updatePageDetails(updatedData).unwrap();

      if (response?.success) {
        toast.success('Page details has been updated successfully');
        initEditor(response?.data);
      } else {
        toast.error('Failed to update the page details');
      }
    } catch (error) {
      toast.error('Failed to update the page details');
      console.error('Error in updating page details', error.message);
    }
  };

  // handlers
  const handleActionClick = (action: PageAction) => {
    const { page_id, name } = page_data;
    switch (action) {
      case PageAction.RENAME:
        openAlert(PageAction.RENAME, { page_id, name });
        break;
      case PageAction.DELETE:
        openAlert(PageAction.DELETE, { page_id });
        break;
      case PageAction.DUPLICATE:
        openAlert(PageAction.DUPLICATE, { page_id });
        break;
      case PageAction.PREVIEW:
        console.log('Not implemented: preview');
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
      toast.error('Error in saving page details');
      console.error('Error in saving page details', error);
    }
  };

  const handleNoConstraintAlertClose = () => {
    setIsConstraintAlertOpen(false);
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
      />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label={TabItems.page_design.label} value={TabItems.page_design.value} />
          <Tab label={TabItems.constraints.label} value={TabItems.constraints.value} />
          <Tab label={TabItems.settings.label} value={TabItems.settings.value} />
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={TabItems.page_design.value} currentTab={currentTab}>
          <BlockEditor onAddComponent={handleAddComponent} onPropChange={handlePropChange} />
          <ComponentModal
            open={compModalOpen}
            onClose={handleCloseCompModal}
            variant="basic"
            onSelect={handleSelectComponent}
          />
          <AssetsModal open={imageModalOpen} onClose={handleCloseImageModal} onSelect={handleSelectImage} />
        </TabPanel>
        <TabPanel value={TabItems.constraints.value} currentTab={currentTab}>
          <PageConstraints />
        </TabPanel>
        <TabPanel value={TabItems.settings.value} currentTab={currentTab}>
          <PageSettings data={page_data} onUpdateSettings={updateExtended} />
        </TabPanel>
      </Box>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 3,
          }}
        >
          <h2 style={{ marginTop: -1.5 }}>{modalData.title}</h2>
          <p>{modalData.description}</p>
          <LoadingButton
            sx={{ float: 'right', ml: 1, mt: 2 }}
            variant="contained"
            onClick={handleUpdatePageStatus}
            loading={isLoading}
          >
            {modalData.action}
          </LoadingButton>
          <Button sx={{ float: 'right', mt: 2 }} variant="outlined" onClick={handleCloseModal}>
            CANCEL
          </Button>
        </Box>
      </Modal>
      <Backdrop open={isFetchingComponentDetail}>
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
