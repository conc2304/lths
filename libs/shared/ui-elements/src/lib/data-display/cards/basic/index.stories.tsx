import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Meta, StoryFn } from '@storybook/react';

import { BasicCard } from './index';

export default {
  title: 'Basic-card',
  component: BasicCard,
} as Meta<typeof BasicCard>;

const Template: StoryFn<typeof BasicCard> = (args) => {
  return <BasicCard {...args}></BasicCard>;
};

export const Basic_card = Template.bind({});
Basic_card.args = {
  title: 'Happy Morning!!🌅',
  subheader: 'Cheers🥳',
  children: 'Cheers to New Weekdays🙌',
  action: <InfoOutlinedIcon />,
  footer: 'Have a Good Weekend 🥰🤞',
};
