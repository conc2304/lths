import HeroPromotionCardTextOverlayAndButtonToolbar from './index';
import colors from '../../../../../common/colors';
import { EditorProvider } from '../../../../../context';
import mockComponent from '../../../../../context/mock-data';
import { Component } from '../../../enum';
import { CardTextOverlayAndButtonComponentProps, AutocompleteItemProps } from '../../../types';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof HeroPromotionCardTextOverlayAndButtonToolbar> = {
  component: HeroPromotionCardTextOverlayAndButtonToolbar,
  title: 'core/ Components/ hero-promotion-card-text-overlay-and-button / Toolbar',
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
        <Story />
      </EditorProvider>
    ),
  ],
};
export default Story;

type StoryArgs = CardTextOverlayAndButtonComponentProps & {
  mock_action: AutocompleteItemProps[];
};

const Template: StoryFn<StoryArgs> = (args) => {
  function mockOnPropChange(propName, callback) {
    if (propName === 'action') {
      callback(args.mock_action);
    }
  }

  return (<HeroPromotionCardTextOverlayAndButtonToolbar {...args} onPropChange={mockOnPropChange} />);
};

export const Primary = Template.bind({});
Primary.args = {
  ...mockComponent,
  __ui_id__: '3333333',
  component_id: Component.HeroPromotionCardTextOverlayAndButton,
  data: {
    image: 'a.Image.png',
    img_alt_text: 'image alt text name',
    title: 'Explore Honda Center',
    description: 'A description',
    btn_text: 'button text',
    action: {
      type: 'native',
      page_id: 'action.one.value',
      page_link: 'first aid link',
    },
  },
  mock_action: [
    { label: 'actionOne', value: 'action.one.value', type: '' },
    { label: 'actionTwo', value: 'action.two.link', type: '' },
    { label: 'actionThree', value: 'action.three.link', type: '' },
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
