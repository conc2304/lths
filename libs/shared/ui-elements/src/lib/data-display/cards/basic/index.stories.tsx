import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BasicCard } from '@lths/shared/ui-elements';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


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
  footer: 'Have a Good Weekend 🥰🤞',
};
