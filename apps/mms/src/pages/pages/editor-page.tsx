import React from 'react';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tab, Tabs, Button, Typography, Modal } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useParams, useNavigate } from 'react-router-dom';

import { useLazyGetPageDetailsQuery, useUpdatePageStatusMutation } from '@lths/features/mms/data-access';
import { BlockEditor, useEditorActions, EditorProvider, Constraints, Settings } from '@lths/features/mms/ui-editor';
import { DropdownButton } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

import TabPanel from './tab-panel';
import ComponentModal from '../../components/pages/editor/components/connected-modal';
import ImageModal from '../../components/pages/editor/images/connected-modal';

export function PageEditorTabs() {
  const [currentTab, setCurrentTab] = useState('page_design');
  const [openModal, setOpenModal] = useState(false);

  const { pageId } = useParams();

  const { initEditor, initPageSettings, settings } = useEditorActions();

  const [getPageDetail] = useLazyGetPageDetailsQuery();

  const [updatePageStatus, { isLoading }] = useUpdatePageStatusMutation();

  const navigate = useNavigate();

  const fetchPageDetail = async (pageId: string) => {
    const response = await getPageDetail({ page_id: pageId });
    const { name, page_id, default_page, description, default_data, status } = response.data?.data || {};
    if (default_data) initEditor(default_data);
    initPageSettings({
      default_page,
      description,
      name,
      page_id,
      status,
    });
  };

  useEffect(() => {
    if (pageId) fetchPageDetail(pageId);
  }, [pageId]);

  const [compModalOpen, setCompModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageCallback, setImageCallback] = useState(null);
  const [modalData, setModalData] = useState({ title: '', description: '', action: '', status: '' });

  const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleCloseCompModal = () => {
    setCompModalOpen(false);
  };
  const handleCloseImageModal = () => {
    setImageModalOpen(false);
  };
  const handleAddComponentClick = () => {
    setCompModalOpen(true);
  };
  const handleAddImageClick = (callback: (url: string) => void) => {
    setImageCallback(() => callback);
    setImageModalOpen(true);
  };
  const handleSelectImage = (url: string) => {
    imageCallback && imageCallback(url);
    setImageModalOpen(false);
  };

  const handleMenuItemSelect = (name: string) => {
    if (name === 'publish') {
      setModalData({
        title: 'Are you sure you want to publish this page?',
        description: 'Once you publish this page, it will be accessible by app users',
        action: 'PUBLISH NOW',
        status: 'PUBLISHED',
      });
    } else if (name === 'unpublish') {
      setModalData({
        title: 'Are you sure you want to unpublish this page?',
        description: 'This page will no longer appear on the app and all links to this page will become inactive.',
        action: 'UNPUBLISH',
        status: 'UNPUBLISHED',
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdatePageStatus = async () => {
    await updatePageStatus({ page_id: pageId, status: modalData.status });
    setOpenModal(false);
    navigate('/pages');
  };

  const menuItems = [
    {
      id: 'publish',
      name: 'PUBLISH NOW',
      action: () => {
        handleMenuItemSelect('publish');
      },
    },
    {
      id: 'unpublish',
      name: 'UNPUBLISH',
      action: () => {
        handleMenuItemSelect('unpublish');
      },
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader
        title={settings?.name}
        rightContent={<DropdownButton buttonText="PUBLISH" menuItems={menuItems} />}
        leftContent={<Typography sx={{ fontSize: '15px', color: '#FF9900', mt: 2.3, ml: 3 }}>DRAFT</Typography>}
        sx={{ mt: 2, mb: 1 }}
      />
      <Box sx={{ mb: 1 }}>
        <Button size="small" color="secondaryButton" onClick={() => console.log('handling duplicate')}>
          DUPLICATE
        </Button>
        <Button size="small" color="secondaryButton" onClick={() => console.log('handling share')}>
          SHARE
        </Button>
        <Button size="small" color="secondaryButton" onClick={() => console.log('handling preview')}>
          PREVIEW
        </Button>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="PAGE DESIGN" value="page_design" />
          <Tab label="CONSTRAINTS" value="constraints" />
          <Tab label="SETTINGS" value="settings" />
        </Tabs>
      </Box>
      <Box>
        <TabPanel value="page_design" currentTab={currentTab}>
          <BlockEditor onAddComponentClick={handleAddComponentClick} onAddImageClick={handleAddImageClick} />
          <ComponentModal open={compModalOpen} onClose={handleCloseCompModal} variant="full" />
          <ImageModal open={imageModalOpen} onClose={handleCloseImageModal} onSelect={handleSelectImage} />
        </TabPanel>
        <TabPanel value="constraints" currentTab={currentTab}>
          <Constraints />
        </TabPanel>
        <TabPanel value="settings" currentTab={currentTab}>
          <Settings />
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
    </Box>
  );
}
const ConnectedPageEditor = () => {
  return (
    <EditorProvider>
      <PageEditorTabs />
    </EditorProvider>
  );
};
export default ConnectedPageEditor;
