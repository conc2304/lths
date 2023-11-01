import { useEffect, useRef } from 'react';

import {
  addFilterGroupItems,
  addFilterItem,
  clearFiltersAndGetUpdatedState,
  removeFilterGroup,
  removeFilterItemAndGetUpdatedState,
  selectFilterDateRange,
  selectFilterFormSchema,
  selectFilterFormState,
  setDateRange,
  setFormState,
  useAppDispatch,
  useAppSelector,
  useLazyGetAppFiltersQuery,
} from '@lths/features/mms/data-access';
import {
  UiFilters,
  getInitialDateRange,
  getInitialFormState,
  transformDateRange,
  transformFilterOptions,
  FilterFormState,
  FilterSettingsPayload,
  SelectedUiFilters,
  FilterSettingsQueryParams,
  transformFormState,
  gatherIds,
} from '@lths/shared/ui-elements';
import { dateToApiQueryString, dateToUTCString } from '@lths/shared/utils';

import { DateRangeFilterOptions } from '../../fixtures/date-range-filter-options';

type ConnectedUiFilterProps = {
  onFiltersUpdate: (filters: FilterSettingsQueryParams) => void;
  onChange?: (filters: FilterSettingsPayload) => void;
};
export const ConnectedUiFilter = (props: ConnectedUiFilterProps) => {
  const { onFiltersUpdate: updateFilters } = props;
  const [getFilterFormData] = useLazyGetAppFiltersQuery();
  const formSchema = useAppSelector(selectFilterFormSchema);
  const formState = useAppSelector(selectFilterFormState);
  const dateRange = useAppSelector(selectFilterDateRange);
  const dispatch = useAppDispatch();

  // we can not send an empty list of filts.
  // So if no filters are selected in the UI,
  // that is the same as every available filter selected in the UI
  const availableFilters = useRef<string[]>([]);

  const isLoading = !formSchema || !formState || !dateRange || !dateRange.end_date || !dateRange.start_date;

  const init = async () => {
    let initializedFormState = formState;
    let initializedDateRange = dateRange;
    if (!formSchema || !formState) {
      const response = await getFilterFormData();
      if (!response?.data) return;
      const formData = response.data;

      availableFilters.current = gatherIds(formData);
      initializedFormState = getInitialFormState(formData);
    }

    if (!dateRange.start_date || !dateRange.end_date) {
      const initialDateFilter = getInitialDateRange(DateRangeFilterOptions).dateRange;
      const { start_date, end_date } =
        typeof initialDateFilter === 'function' ? initialDateFilter() : initialDateFilter;
      initializedDateRange = { start_date: dateToUTCString(start_date), end_date: dateToUTCString(end_date) };
      if (!start_date || !end_date) return;
    }

    const initialFilters = transformFormState(initializedFormState);
    const filterIds = Object.values(initialFilters).flatMap((ids) => ids);

    const filterOptions: FilterSettingsQueryParams = {
      // if no filters are selected in the UI, that is the same as every filter selected in the UI
      filters: filterIds.length > 0 ? filterIds : availableFilters.current,
      date_range: [
        dateToApiQueryString(initializedDateRange.start_date),
        dateToApiQueryString(initializedDateRange.end_date),
      ],
    };

    dispatch(setDateRange(initializedDateRange));
    updateFilters(filterOptions);
  };

  useEffect(() => {
    init();
  }, []);

  const handleUpdateRedux = ({ filters, dateRange }: SelectedUiFilters) => {
    // Data that is for UI needs
    const [start_date, end_date] = transformDateRange(dateRange);

    dispatch(setDateRange({ start_date, end_date })); // make the Date data serializable for Redux
    dispatch(setFormState({ formState: filters }));
  };

  return (
    <UiFilters
      isLoading={isLoading}
      formSchema={formSchema}
      formState={formState}
      dateOptions={DateRangeFilterOptions}
      dateRangeValue={{
        start_date: dateRange.start_date ? new Date(dateRange.start_date) : null,
        end_date: dateRange.end_date ? new Date(dateRange.end_date) : null,
      }}
      onApplyFilters={(selectedFilters: SelectedUiFilters) => {
        const { filters, dateRange } = selectedFilters;
        handleUpdateRedux({ filters, dateRange });
        // transform the filters for the request payload
        const formattedFilters = transformFilterOptions({ formState: filters, dateRange: dateRange });
        if (!formattedFilters.filters || formattedFilters.filters.length <= 0) {
          // if no filters are selected in the UI, that is the same as every filter selected in the UI
          formattedFilters.filters = availableFilters.current;
        }

        updateFilters(formattedFilters);
      }}
      setDateRange={(dateRangeOption) => {
        const { start_date, end_date } = dateRangeOption.dateRange;
        dispatch(setDateRange({ start_date: dateToUTCString(start_date), end_date: dateToUTCString(end_date) }));
      }}
      setFormState={(formState) => {
        dispatch(setFormState(formState));
      }}
      removeItem={async ({ parentID, itemID }) => {
        const nextState = await dispatch(removeFilterItemAndGetUpdatedState({ parentID, itemID }));
        if (nextState?.payload) return nextState.payload as FilterFormState;
      }}
      addItem={({ parentID, itemID, item }) => {
        dispatch(addFilterItem({ parentID, itemID, item }));
      }}
      addGroupItems={({ parentID, items }) => {
        dispatch(addFilterGroupItems({ parentID, items }));
      }}
      clearGroup={({ parentID }) => {
        dispatch(removeFilterGroup({ parentID }));
      }}
      clearForm={async () => {
        const nextState = await dispatch(clearFiltersAndGetUpdatedState());
        if (nextState?.payload) return nextState.payload as FilterFormState;
      }}
    />
  );
};
