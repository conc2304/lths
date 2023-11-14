import { Countries } from '@lths/shared/utils';

import { CountrySelect } from './country-select';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof CountrySelect> = {
  component: CountrySelect,
  title: 'Inputs/ Country Selector',
};

export default Story;

const Template: StoryFn<typeof CountrySelect> = (args) => {
  return <CountrySelect {...args} countryOptions={[...Countries]} />;
};

export const Primary = Template.bind({});

Primary.args = {
  showPhoneCode: true,
  showCountryCode: false,
  showCountryFlag: true,
  label: 'Select a Country',
  fullWidth: false,
};
