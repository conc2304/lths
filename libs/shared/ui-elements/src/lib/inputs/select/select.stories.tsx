import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { SelectLTHS } from './select';

const Story: Meta<typeof SelectLTHS> = {
  component: SelectLTHS,
  title: 'Inputs/ Select',
};

export default Story;

const Template: StoryFn<typeof SelectLTHS> = (args) => {
  const [selectedValue, setSelectedValue] = useState<any>(args.value);

  const handleValueChange = (value: any) => {
    console.log(value);
    setSelectedValue(value);
  };

  return (
    <>
      <pre>Value: {JSON.stringify(selectedValue)}</pre>
      <SelectLTHS {...args} onChange={handleValueChange} value={selectedValue} />
    </>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  value: '',
  options: [
    { value: 5, label: 'These' },
    { value: 15, label: 'are' },
    { value: 20, label: 'objects' },
    { value: 25, label: 'with' },
    { value: 25, label: 'values' },
  ],
  placeholder: 'Placeholder Text',
  label: 'Select Label',
  name: 'FieldName',
  noOptionsAvailableText: 'No options :<',
  helperText: undefined,
  error: false,
};
export const Basic = Template.bind({});

Basic.args = {
  value: '',
  options: ['these', 'are', 'basic', 'values'],
  placeholder: 'Placeholder Text',
  label: 'Select Label',
  name: 'FieldName',
  noOptionsAvailableText: 'No options :<',
  helperText: undefined,
  error: false,
};
