import { useState } from 'react';

import { UiFilters } from './index';
import { DateRangeFilterOptions_Mock, formSchema_Mock } from './mock-data';
import { DateRange, FilterFormState, FormStateValue, SelectedUiFilters } from '../../types';
import { getInitialFormState } from '../../utils';
import {
  handleAddFormStateItem,
  handleAddFormStateItems,
  handleRemoveFormStateGroup,
  handleRemoveFormStateItem,
} from '../../utils/actions';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof UiFilters> = {
  component: UiFilters,
  title: 'Features/ UI Filters',
};

export default Story;

const Template: StoryFn<typeof UiFilters> = (args) => {
  const [dateRange, setDateRange] = useState(args.dateRangeValue);
  const [formState, setFormState] = useState(getInitialFormState(args.formSchema));

  const handleAddItem = ({ parentID, item }: { parentID: string; item: FormStateValue }) => {
    if (!formState) return;
    const newState = handleAddFormStateItem(formState, { parentID, item });
    setFormState(newState);
  };

  const handleAddGroupItems = ({ parentID, items }: { parentID: string; items: FormStateValue }) => {
    if (!formState) return;
    const newState = handleAddFormStateItems(formState, { parentID, items });
    setFormState(newState);
  };

  const handleClearGroup = ({ parentID }: { parentID: string }) => {
    if (!formState) return;

    const newState = handleRemoveFormStateGroup(formState, { parentID });
    setFormState(newState);
  };

  const handleRemoveItem = ({ parentID, itemID }: { parentID: string; itemID: string }) => {
    if (!formState) return Promise.resolve({} as FilterFormState);

    const nextState = handleRemoveFormStateItem(formState, { parentID, itemID });
    setFormState(nextState);
    return Promise.resolve({
      formState: nextState,
    } as FilterFormState);
  };

  const handleApplyFilters = (selectedFilters: SelectedUiFilters) => {
    const { filters, dateRange } = selectedFilters;
    setFormState(filters);
    setDateRange(dateRange);

    console.log(`onApplyFilters Fired: \n\r
    Filters: \r
    ${JSON.stringify(filters)} \r
    Dates: \r
    ${JSON.stringify(dateRange)} `);
  };

  return (
    <UiFilters
      {...args}
      dateOptions={args.dateOptions}
      formSchema={args.formSchema}
      onApplyFilters={handleApplyFilters}
      setDateRange={({ dateRange }) => {
        setDateRange(dateRange);
      }}
      formState={formState}
      dateRangeValue={dateRange}
      setFormState={({ formState }) => {
        console.log(`setFormState Fired: ${JSON.stringify(formState)} `);
        setFormState(formState);
      }}
      removeItem={handleRemoveItem}
      addItem={handleAddItem}
      addGroupItems={handleAddGroupItems}
      clearGroup={handleClearGroup}
      clearForm={async () => {
        const nextState = {};
        return nextState as FilterFormState;
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  dateOptions: DateRangeFilterOptions_Mock,
  dateRangeValue: DateRangeFilterOptions_Mock.find((item) => item.isDefaultValue)?.dateRange as DateRange,
  formSchema: formSchema_Mock,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
