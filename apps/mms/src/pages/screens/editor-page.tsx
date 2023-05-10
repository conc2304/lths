import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { useLazyGetComponentListQuery } from '@lths/features/mms/data-access';
import { BlockEditor, useEditorActions } from '@lths/features/mms/ui-editor';
import { EditorProvider } from '@lths/features/mms/ui-editor';

import { ComponentModal, ConnectedComponentModal } from './component-modal2';
import TabPanel from './tab-panel';

/* eslint-disable-next-line */
export interface PageEditorTabsProps {}

export function PageEditorTabs() {
  const [currentTab, setCurrentTab] = useState('page_design');

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  const [getData, { isFetching, isSuccess, data }] = useLazyGetComponentListQuery();

  const { components, initEditor, addComponent } = useEditorActions();
  /*useEffect(() => {
    initEditor([
      { component_name: 'Hero Card', __ui_id__: '1', component_id: 'qCardView' },
      { component_name: 'Quick Links', __ui_id__: '2', component_id: 'cQuickLinkView' },
      { component_name: 'Button', __ui_id__: '3', component_id: 'cButton' },
      { component_name: 'Card View', __ui_id__: '4', component_id: 'qCardView' },
    ]);
  }, []);
 const handleAddComponentClick = () => {
    const id = uuidv4();
    addComponent({ id, name: 'Card View', __ui_id__: id, type: 'qCardView' });
    console.log('handleTabChange', components);
  };*/
  const fetchData = async () => {
    await getData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    // initEditor(data?.data ? data.data : []);
  }, [data]);
  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleAddComponentClick = () => {
    const id = uuidv4();
    //addComponent({ id, name: 'Card View', __ui_id__: id, type: 'qCardView' });
    console.log('handleTabChange', components);
    setModalOpen(true);
  };
  console.log('handleTabChange', components);
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
      <Box p={2}>
        <TabPanel value="page_design" currentTab={currentTab}>
          <BlockEditor onAddComponentClick={handleAddComponentClick} />
          <ConnectedComponentModal open={modalOpen} onClose={handleCloseModal} />
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
