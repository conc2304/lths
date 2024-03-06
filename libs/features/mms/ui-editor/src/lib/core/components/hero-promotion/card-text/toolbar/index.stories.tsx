import HeroPromotionCardTextToolbar from './index';
import colors from '../../../../../common/colors';
import { EditorProvider, ToolbarContextProvider } from '../../../../../context';
import mockComponent from '../../../../../context/mock-data';
import { Component } from '../../../enum';
import { CardTextComponentProps, PageAutocompleteItemProps } from '../../../types';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof HeroPromotionCardTextToolbar> = {
  component: HeroPromotionCardTextToolbar,
  title: 'core/ Components/ hero-promotion-card-text / Toolbar',
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

type StoryArgs = CardTextComponentProps & {
  mock_action: PageAutocompleteItemProps[];
};

const Template: StoryFn<StoryArgs> = (args) => {
  function mockOnPropChange(propName, callback) {
    if (propName === 'action') {
      callback(args.mock_action);
    }
  }

  return (<HeroPromotionCardTextToolbar {...args} onPropChange={mockOnPropChange} />);
};

export const Primary = Template.bind({});
Primary.args = {
  ...mockComponent,
  __ui_id__: '3333333',
  component_id: Component.HeroPromotionCardText,
  data: {
    image: 'a.Image.png',
    img_alt_text: 'image alt text name',
    title: 'The Title',
    description: 'A description',
    action: {
      type: 'native',
      page_id: 'action.one.value',
      page_link: 'A link',
    },
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
