import { SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { BlockEditor, SortableList } from '@lths-mui/features/mms/ui-editor';

import TabPanel from './tab-panel';
/* eslint-disable-next-line */
export interface PageEditorTabsProps {}

export function PageEditorTabs() {
  const [currentTab, setCurrentTab] = useState('page_design');

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
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
      <Box p={2}>
        <TabPanel value="page_design" currentTab={currentTab}>
          <BlockEditor />
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

export default PageEditorTabs;
