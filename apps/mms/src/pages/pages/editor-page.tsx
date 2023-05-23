import { SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import { BlockEditor } from '@lths/features/mms/ui-editor';
import { EditorProvider } from '@lths/features/mms/ui-editor';

import TabPanel from './tab-panel';
import ConnectedComponentModal from '../../components/pages/editor/components/connected-modal';
import ConnectedImageModalWrapper from '../../components/pages/editor/images/connected-image-modal';

export function PageEditorTabs() {
  const [currentTab, setCurrentTab] = useState('page_design');

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleImageCloseModal = () => {
    setImageModalOpen(false);
  };
  const handleAddComponentClick = () => {
    setModalOpen(true);
  };
  const handleAddImageClick = () => {
    setImageModalOpen(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="PAGE DESIGN" value="page_design" />
          <Tab label="SEGEMENTS" value="segments" />
          <Tab label="SCHEDULE" value="schedule" />
          <Tab label="SETTINGS" value="settings" />
        </Tabs>
      </Box>
      <Box>
        <TabPanel value="page_design" currentTab={currentTab}>
          <BlockEditor onAddComponentClick={handleAddComponentClick} onAddImageClick={handleAddImageClick} />
          <ConnectedComponentModal open={modalOpen} onClose={handleCloseModal} variant="full" />
          <ConnectedImageModalWrapper open={imageModalOpen} onClose={handleImageCloseModal} />
        </TabPanel>
        <TabPanel value="segments" currentTab={currentTab}>
          Segments Component goes here...
        </TabPanel>
        <TabPanel value="schedule" currentTab={currentTab}>
          Schedule Component goes here...
        </TabPanel>
        <TabPanel value="settings" currentTab={currentTab}>
          Settings Component goes here...
        </TabPanel>
      </Box>
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
