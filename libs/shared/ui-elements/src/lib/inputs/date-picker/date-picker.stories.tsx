import { useState } from 'react';
import { Button, Divider } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';

import { DatePickerLTHS } from './date-picker';

const Story: Meta<typeof DatePickerLTHS> = {
  component: DatePickerLTHS,
  title: 'Inputs/ Date Picker',
};

export default Story;

const Template: StoryFn<typeof DatePickerLTHS> = (args) => {
  const [selectedValue, setSelectedValue] = useState<any>(args.value);
  const [selectedMode, setSelectedMode] = useState<'date' | 'datetime'>(args.mode);

  const handleValueChange = (value: any) => {
    setSelectedValue(value);
  };

  const onAddTime = () => {
    const nextMode = selectedMode === 'date' ? 'datetime' : 'date';
    console.log('add time', nextMode);
    setSelectedMode(nextMode);
  };

  return (
    <>
      <Button onClick={() => onAddTime()}>Toggle date/time mode [MOCK]</Button>
      <Divider sx={{ mb: 3 }} />

      <DatePickerLTHS
        {...args}
        onChange={handleValueChange}
        value={selectedValue}
        onAddTime={onAddTime}
        mode={selectedMode}
      />
    </>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  mode: 'date',
  value: undefined,
  placeholder: 'Placeholder',
  label: 'Pick Date',
  helperText: undefined,
  error: false,
};
