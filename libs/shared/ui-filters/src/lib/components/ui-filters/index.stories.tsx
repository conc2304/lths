import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import produce from 'immer';

import { DateRange, FilterFormState, FormStateValue, SelectedUiFilters } from '@lths/types/ui-filters';

import { UiFilters } from './index';
import { DateRangeFilterOptions_Mock, formSchema_Mock } from './mock-data';
import { getInitialFormState } from '../../utils';

const Story: ComponentMeta<typeof UiFilters> = {
  component: UiFilters,
  title: 'Features/ UI Filters',
};

export default Story;

const Template: ComponentStory<typeof UiFilters> = (args) => {
  const [dateRange, setDateRange] = useState(args.dateRangeValue);
  const [formState, setFormState] = useState(getInitialFormState(args.formSchema));

  const handleAddItem = ({ parentID, item }: { parentID: string; item: FormStateValue }) => {
    const newState = produce(formState, (draft) => {
      if (!draft[parentID]) {
        draft[parentID] = item;
      } else {
        draft[parentID] = {
          ...formState[parentID],
          ...item,
        };
      }
    });
    setFormState(newState);
    alert(`onAddItem Fired: \n ${parentID} - ${item}`);
  };

  const handleAddGroupItems = ({ parentID, items }: { parentID: string; items: FormStateValue }) => {
    const newState = produce(formState, (draft) => {
      draft[parentID] = {
        ...formState[parentID],
        ...items,
      };
    });

    setFormState(newState);
    alert(`onAddGroupItems Fired: \n ${parentID} \n ${JSON.stringify(items)}`);
  };

  const handleClearGroup = ({ parentID }: { parentID: string }) => {
    const newState = produce(formState, (draft) => {
      delete draft[parentID];
    });
    setFormState(newState);
    alert(`onClearGroup Fired: ${parentID} `);
  };

  const handleRemoveItem = ({ parentID, itemID }: { parentID: string; itemID: string }) => {
    const nextState = produce(formState, (draft) => {
      if (!draft[parentID]) return formState;
      delete draft[parentID][itemID];
      if (!Object.keys(draft[parentID]).length) delete draft[parentID];
    });

    setFormState(nextState);
    alert(`onRemoveItem Fired: ${parentID} - ${itemID} `);
    return Promise.resolve({} as FilterFormState);
  };

  const handleApplyFilters = (selectedFilters: SelectedUiFilters) => {
    const { filters, dateRange } = selectedFilters;
    setFormState(filters);
    setDateRange(dateRange);

    alert(`onApplyFilters Fired: \n\r
    Filters: \r
    ${JSON.stringify(filters)} \r
    Dates: \r
    ${JSON.stringify(dateRange)} `);
  };

  return (
    <UiFilters
      dateOptions={args.dateOptions}
      formSchema={args.formSchema}
      onApplyFilters={handleApplyFilters}
      setDateRange={({ dateRange }) => {
        setDateRange(dateRange);
      }}
      formState={formState}
      dateRangeValue={dateRange}
      setFormState={({ formState }) => {
        alert(`setFormState Fired: ${JSON.stringify(formState)} `);
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
