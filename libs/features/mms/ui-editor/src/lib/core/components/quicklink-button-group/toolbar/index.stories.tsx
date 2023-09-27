import { Box } from '@mui/material';

import QuicklinkButtonGroupToolbar from './index';
import { EditorProvider } from '../../../../context';
import mockComponent from '../../../../context/mock-data';
import { AutocompleteOptionProps } from '../../../../elements';
import { Component } from '../../enum';
import { QuicklinkButtonGroupComponentProps } from '../../types';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof QuicklinkButtonGroupToolbar> = {
  component: QuicklinkButtonGroupToolbar,
  title: 'core/ Components/ quicklink-button-group / Toolbar',
};
export default Story;

type StoryArgs = QuicklinkButtonGroupComponentProps & {
  mock_quickLinkIcons: AutocompleteOptionProps[];
};

const Template: StoryFn<StoryArgs> = (args) => {
  const initialState = {
    components: [],
    selectedComponent: args
  };

  function mockOnPropChange(propName, callback) {
    if (propName === 'quickLinkIcons') {
      callback(args.mock_quickLinkIcons);
    }
  };


  return (
    <EditorProvider initialValue={initialState}>
      <Box sx={{padding: '16px', backgroundColor: 'rgb(245, 245, 245)' }}>
          <QuicklinkButtonGroupToolbar {...args} onPropChange={mockOnPropChange} />
      </Box>
    </EditorProvider>
  )
};


export const Primary = Template.bind({});
Primary.args = {
    ...mockComponent,
    __ui_id__ : "3333333",
    component_id: Component.QuicklinkButtonGroup,
    data: {    
      sub_component_data: [
        {
          card_background_color: "",
          icon: "nonexistent png",
          text_color: "",
          title: "LABEL",
          action: {
            type: '',
            page_id: 'medical page',
            page_link: 'first aid link',
          },
        },
        {
          card_background_color: "",
          icon: "nonexistent png 2",
          text_color: "",
          title: "LABEL2",
          action: {
            type: '',
            page_id: 'report crime',
            page_link: 'local police department link',
          },
        }
      ],
    },
    mock_quickLinkIcons: [
      { label: "iconOne", value: "icon.one.link" },
      { label: "iconTwo", value: "icon.two.link" },
      { label: "iconThree", value: "icon.three.link" }
    ]
}

Primary.argTypes = {
    __ui_id__: { table: { disable: true}},
    component_id: { table: { disable: true}},
    _id: { table: { disable: true}},
    name: { table: { disable: true}},
    description: { table: { disable: true}},
    category: { table: { disable: true}},
    image_url: { table: { disable: true}},
    display_order: { table: { disable: true}},
    variation_id: { table: { disable: true}},
    schema: { table: { disable: true}},
}