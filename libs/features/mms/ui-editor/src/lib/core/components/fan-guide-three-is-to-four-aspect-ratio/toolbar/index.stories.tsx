import FanGuideThreeIsToFourAspectRatioToolbar from './index';
import colors from '../../../../common/colors';
import { EditorProvider, ToolbarContextProvider } from '../../../../context';
import mockComponent from '../../../../context/mock-data';
import { Component } from '../../enum';
import { FanGuideThreeIsToFourAspectRatioComponentProps, PageAutocompleteItemProps } from '../../types';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof FanGuideThreeIsToFourAspectRatioToolbar> = {
  component: FanGuideThreeIsToFourAspectRatioToolbar,
  title: 'core/ Components/ fan-guide-three-is-to-four-aspect-ratio / Toolbar',
  parameters: {
    backgrounds: {
      default: 'sidebar',
      values: [
        { name: 'sidebar', value: colors.sidebar.background },
      ],
    },
  },
  decorators: [
    (Story) => (
      <EditorProvider initialValue={{components: []}}>
        <ToolbarContextProvider initialValue={{}}>
          <Story />
        </ToolbarContextProvider>
      </EditorProvider>
    ),
  ],
};
export default Story;

type StoryArgs = FanGuideThreeIsToFourAspectRatioComponentProps & {
  mock_action: PageAutocompleteItemProps[];
};

const Template: StoryFn<StoryArgs> = (args) => {
  function mockOnPropChange(propName, callback) {
    if (propName === 'action') {
      callback(args.mock_action);
    }
  }

  return (
    <FanGuideThreeIsToFourAspectRatioToolbar {...args} onPropChange={mockOnPropChange} />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  ...mockComponent,
  __ui_id__: '3333333',
  component_id: Component.FanGuideThreeIsToFourAspectRatio,
  data: {
    image: 'image.one',
    img_alt_text: 'image_alt_text1',
    title: 'LABEL',
    description: 'description 1',
    action: {
      type: 'native',
      page_id: 'action.one.value',
      page_link: 'first aid link',
    },
    btn_text: 'Get help',
  },
  mock_action: [
    { label: 'actionOne', value: 'action.one.value', type: '', static: false },
    { label: 'actionTwo', value: 'action.two.link', type: '', static: false },
    { label: 'actionThree', value: 'action.three.link', type: '', static: false },
  ],
};

Primary.argTypes = {
  __ui_id__: { table: { disable: true } },
  component_id: { table: { disable: true } },
  _id: { table: { disable: true } },
  name: { table: { disable: true } },
  description: { table: { disable: true } },
  category: { table: { disable: true } },
  image_url: { table: { disable: true } },
  display_order: { table: { disable: true } },
  variation_id: { table: { disable: true } },
  schema: { table: { disable: true } },
};
