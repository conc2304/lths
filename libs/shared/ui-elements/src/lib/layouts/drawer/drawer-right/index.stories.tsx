import React, { useState } from 'react';
import { Button, Toolbar } from '@mui/material';

import { PageContentWithRightDrawer } from './index';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

const Story: ComponentMeta<typeof PageContentWithRightDrawer> = {
  component: PageContentWithRightDrawer,
  title: 'Layouts/ Drawer/ Drawer Right',
};
export default Story;

const Template: ComponentStory<typeof PageContentWithRightDrawer> = (args) => {
  const [open, setOpen] = useState(false);

  args.open = open;
  args.handleDrawerClose = () => setOpen(false);

  return (
      <PageContentWithRightDrawer {...args} >
        <Toolbar />
        <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: "grey" }}>
          <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        </div>
      </PageContentWithRightDrawer>
  )
};


export const Primary = Template.bind({});
Primary.args = {
  drawerWidth: 371,
  title: "Drawer Title",
  maxTitleLength: 22,
  drawerContent: <div>Drawer Content</div>,
};
