import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChartCard } from '@lths/shared/ui-elements';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


export default {
  title: 'Chart-Card',
  component: ChartCard,
} as ComponentMeta<typeof ChartCard>;

const Template: ComponentStory<typeof ChartCard> = (args) => {
  return <ChartCard {...args}></ChartCard>;
};

export const chartcard = Template.bind({});
chartcard.args = {
  title: 'Happy Morning!!🌅',
  subheader: 'Cheers🥳',
  children: 'Cheers to New Weekdays🙌',
  action: <InfoOutlinedIcon/>
};
