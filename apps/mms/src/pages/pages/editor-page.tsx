import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useLazyGetPageDetailsQuery } from '@lths/features/mms/data-access';
import { BlockEditor, Settings, useEditorActions } from '@lths/features/mms/ui-editor';
import { EditorProvider } from '@lths/features/mms/ui-editor';

import TabPanel from './tab-panel';
import ComponentModal from '../../components/pages/editor/components/connected-modal';
import ImageModal from '../../components/pages/editor/images/connected-modal';

export function PageEditorTabs() {
  const [currentTab, setCurrentTab] = useState('page_design');

  const { pageId } = useParams();

  const { initEditor, initPageSettings } = useEditorActions();

  const [getPageDetail] = useLazyGetPageDetailsQuery();

  const fetchPageDetail = async (pageId: string) => {
    const response = await getPageDetail({ page_id: pageId });
    console.log('page detail response', response);
    const { name, page_id, default_page, description, default_data, status } = response.data?.data || {};
    initEditor(default_data);
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
          <Tab label="CONSTRAINTS" value="constraints" />
          <Tab label="SETTINGS" value="settings" />
          <Tab label="VERSIONS" value="versions" />
        </Tabs>
      </Box>
      <Box>
        <TabPanel value="page_design" currentTab={currentTab}>
          <BlockEditor onAddComponentClick={handleAddComponentClick} onAddImageClick={handleAddImageClick} />
          <ComponentModal open={compModalOpen} onClose={handleCloseCompModal} variant="full" />
          <ImageModal open={imageModalOpen} onClose={handleCloseImageModal} onSelect={handleSelectImage} />
        </TabPanel>
        <TabPanel value="constraints" currentTab={currentTab}>
          Constraints Component goes here...
        </TabPanel>
        <TabPanel value="settings" currentTab={currentTab}>
          <Settings />
        </TabPanel>
        <TabPanel value="versions" currentTab={currentTab}>
          Versions Component goes here...
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
