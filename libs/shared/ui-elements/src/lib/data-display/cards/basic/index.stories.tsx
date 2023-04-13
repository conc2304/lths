import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BasicCard } from '@lths/shared/ui-elements';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export default {
  title: 'Basic-card',
  component: BasicCard,
} as ComponentMeta<typeof BasicCard>;

const Template: ComponentStory<typeof BasicCard> = (args) => {
  return <BasicCard {...args}></BasicCard>;
};

export const Basic_card = Template.bind({});
Basic_card.args = {
  title: 'Happy Morning!!🌅',
  subheader: 'Cheers🥳',
  children: 'Cheers to New Weekdays🙌',
  action: <InfoOutlinedIcon/>,
  footerdata: 'Have a Good Weekend 🥰🤞',
  footerIcon: <ArrowForwardIcon/>,
};
