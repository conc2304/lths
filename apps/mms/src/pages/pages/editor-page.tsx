import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useParams } from 'react-router-dom';

import { BlockEditor } from '@lths/features/mms/ui-editor';
import { EditorProvider } from '@lths/features/mms/ui-editor';

import TabPanel from './tab-panel';
import ComponentModal from '../../components/pages/editor/components/connected-modal';
import ImageModal from '../../components/pages/editor/images/connected-modal';

export function PageEditorTabs() {
  const [currentTab, setCurrentTab] = useState('page_design');
  const [compModalOpen, setCompModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageCallback, setImageCallback] = useState(null);
  const { pageId } = useParams();
  const fetchData = async (pageId: string) => {
    console.log(pageId);
  };
  useEffect(() => {
    console.log(pageId);
    if (pageId) fetchData(pageId);
  }, [pageId]);
  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
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
          <ComponentModal open={compModalOpen} onClose={handleCloseCompModal} variant="full" />
          <ImageModal open={imageModalOpen} onClose={handleCloseImageModal} onSelect={handleSelectImage} />
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
