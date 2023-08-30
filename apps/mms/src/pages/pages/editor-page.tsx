import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tab, Tabs, Button, Modal, Backdrop, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

import {
  PageDetail,
  useDuplicatePageMutation,
  useLazyGetComponentDetailQuery,
  useLazyGetDefaultPagesQuery,
  useLazyGetPageDetailsQuery,
  useUpdatePageDetailsMutation,
  useUpdatePageStatusMutation,
} from '@lths/features/mms/data-access';
import {
  BlockEditor,
  useEditorActions,
  EditorProvider,
  Callback,
  AutocompleteItemProps,
} from '@lths/features/mms/ui-editor';

import TabPanel from './tab-panel';
import { ComponentModal } from '../../components/pages/editor';
import AssetsModal from '../../components/pages/editor/assets/connected-modal';
import { Constraints, Settings } from '../../components/pages/editor/containers';
import { PageHeader } from '../../components/pages/editor/containers/core';
import { PageStatus } from '../../components/pages/editor/containers/core/types';

const StatusChangeModalData = {
  [PageStatus.PUBLISHED]: {
    title: 'Are you sure you want to publish this page?',
    description: 'Once you publish this page, it will be accessible by app users',
    action: 'PUBLISH NOW',
    status: PageStatus.PUBLISHED,
  },
  [PageStatus.UNPUBLISHED]: {
    title: 'Are you sure you want to unpublish this page?',
    description: 'This page will no longer appear on the app and all links to this page will become inactive.',
    action: 'UNPUBLISH',
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
  const { initEditor, addComponent, components, data } = useEditorActions();
  const [getPageDetail] = useLazyGetPageDetailsQuery();
  const [updatePageStatus, { isLoading }] = useUpdatePageStatusMutation();
  const [getDefaultPage] = useLazyGetDefaultPagesQuery();
  const [updatePageDetails] = useUpdatePageDetailsMutation();
  const [getDetail, { isFetching: isFetchingComponentDetail }] = useLazyGetComponentDetailQuery();

  //state
  const [currentTab, setCurrentTab] = useState(TabItems.page_design.value);
  const [openModal, setOpenModal] = useState(false);
  const [compModalOpen, setCompModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageCallback, setImageCallback] = useState(null);
  const [modalData, setModalData] = useState({ title: '', description: '', action: '', status: '' });

  //route params
  const { pageId } = useParams();

  const [duplicatePage, { isLoading: isDuplicatingPage }] = useDuplicatePageMutation();

  const navigate = useNavigate();

  //fetch params
  const page_data = data as PageDetail;

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
  const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
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

  function handlePropChange<T>(propName: string, callback: Callback<T>): void {
    if (propName === 'image_url') {
      handleAddImage(callback as Callback<string>);
    } else if (propName === 'action') {
      handlAddAction(callback as Callback<AutocompleteItemProps>);
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

  //api events
  const handleUpdatePageStatus = async () => {
    await updatePageStatus({ page_id: pageId, status: modalData.status });
    setOpenModal(false);
    navigate('/pages');
  };
  const handleEditorUpdate = async () => {
    handleUpdatePageDetails();
  };

  const handleUpdatePageDetails = async (updatedData?: PageDetail) => {
    try {
      updatedData = updatedData
        ? {
            ...page_data,
            ...updatedData,
          }
        : { ...page_data, components };

      const response = await updatePageDetails(updatedData).unwrap();

      if (response?.success) {
        toast.success('Page details has been updated successfully');
        initEditor(response?.data);
      }
    } catch (error) {
      console.error('Error in updating page details', error.message);
    }
  };

  const handleDuplicatePage = async () => {
    try {
      const response = await duplicatePage({ page_id: pageId }).unwrap();
      if (response?.success) {
        toast.success('Page has been duplicated successfully');
        navigate('/pages');
      }
    } catch (error) {
      console.error('Error in duplicating page', error.message);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader title={page_data?.name} status={page_data?.status} onStatusChange={handleMenuItemSelect} />
      <Box sx={{ mb: 1 }}>
        <LoadingButton loading={isDuplicatingPage} size="small" color="secondaryButton" onClick={handleDuplicatePage}>
          DUPLICATE
        </LoadingButton>
        <Button size="small" color="secondaryButton" onClick={() => console.log('Not Implemented: share')}>
          SHARE
        </Button>
        <Button size="small" color="secondaryButton" onClick={() => console.log('Not Implemented: preview')}>
          PREVIEW
        </Button>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label={TabItems.page_design.label} value={TabItems.page_design.value} />
          <Tab label={TabItems.constraints.label} value={TabItems.constraints.value} />
          <Tab label={TabItems.settings.label} value={TabItems.settings.value} />
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={TabItems.page_design.value} currentTab={currentTab}>
          <BlockEditor
            onAddComponent={handleAddComponent}
            onPropChange={handlePropChange}
            onUpdate={handleEditorUpdate}
          />
          <ComponentModal
            open={compModalOpen}
            onClose={handleCloseCompModal}
            variant="basic"
            onSelect={handleSelectComponent}
          />
          <AssetsModal open={imageModalOpen} onClose={handleCloseImageModal} onSelect={handleSelectImage} />
        </TabPanel>
        <TabPanel value={TabItems.constraints.value} currentTab={currentTab}>
          <Constraints onUpdate={handleUpdatePageDetails} />
        </TabPanel>
        <TabPanel value={TabItems.settings.value} currentTab={currentTab}>
          <Settings onUpdate={handleUpdatePageDetails} />
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
      <PageEditorTabs />
    </EditorProvider>
  );
};
export default ConnectedPageEditor;
