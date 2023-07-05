import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tab, Tabs, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useLazyGetPageDetailsQuery } from '@lths/features/mms/data-access';
import { BlockEditor, useEditorActions } from '@lths/features/mms/ui-editor';
import { EditorProvider } from '@lths/features/mms/ui-editor';
import { PageHeader } from '@lths/shared/ui-layouts';

import TabPanel from './tab-panel';
import ComponentModal from '../../components/pages/editor/components/connected-modal';
import ImageModal from '../../components/pages/editor/images/connected-modal';

export function PageEditorTabs() {
  const [currentTab, setCurrentTab] = useState('page_design');

  const { pageId } = useParams();

  const { initEditor } = useEditorActions();

  const [getPageDetail] = useLazyGetPageDetailsQuery();

  const fetchPageDetail = async (pageId: string) => {
    const response = await getPageDetail({ page_id: pageId });
    initEditor(response?.data?.data?.default_data);
  };

  useEffect(() => {
    if (pageId) fetchPageDetail(pageId);
  }, [pageId]);

  const [compModalOpen, setCompModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageCallback, setImageCallback] = useState(null);

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
      <PageHeader
        title="Ad Requirements"
        rightContent={
          <Button variant="contained" onClick={() => console.log(`handling publish`)}>
            Publish
          </Button>
        }
        leftContent={<Typography sx={{ fontSize: '20px', color: '#FF9900', mt: 1.7, ml: 3 }}>Draft</Typography>}
        sx={{ mt: 2, mb: 1 }}
      />
      <Box sx={{ mb: 1 }}>
        <Button size="small" color="secondaryButton">
          DUPLICATE
        </Button>
        <Button size="small" color="secondaryButton">
          SHARE
        </Button>
        <Button size="small" color="secondaryButton">
          PREVIEW
        </Button>
      </Box>
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
