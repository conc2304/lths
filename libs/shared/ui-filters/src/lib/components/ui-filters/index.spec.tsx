import { RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DateFilterOptions, DateRange, FormSchema, FormState } from '@lths/types/ui-filters';

import { UiFilters, UiFilterProps } from './index';
import { formSchema_Mock, DateRangeFilterOptions_Mock } from './mock-data';
import { getInitialFormState } from '../../utils/index';

// TODO - Finish getting the skipped tests working

const mockFilterSchema: FormSchema[] = formSchema_Mock;
const mockDateOptions: DateFilterOptions = DateRangeFilterOptions_Mock;
const mockDateRangeValue = mockDateOptions.find((item) => item.isDefaultValue)?.dateRange as DateRange;
const mockFormState: FormState = getInitialFormState(mockFilterSchema);

const mockProps: UiFilterProps = {
  onApplyFilters: jest.fn(),
  dateOptions: mockDateOptions,
  setDateRange: jest.fn(),
  dateRangeValue: mockDateRangeValue,
  formSchema: mockFilterSchema,
  formState: mockFormState,
  setFormState: jest.fn(),
  removeItem: jest.fn(),
  addItem: jest.fn(),
  addGroupItems: jest.fn(),
  clearGroup: jest.fn(),
  clearForm: jest.fn(),
};

describe('UiFilters', () => {
  beforeEach(() => {
    render(RBThemeProvider({ children: <UiFilters {...mockProps} /> }));
  });

  afterEach(() => {
    cleanup();
  });

  it('should open and close the modal when clicking the Filter button', async () => {
    // Initialization
    const init_modal = screen.queryByRole('dialog');
    expect(init_modal).toBeNull();

    // Open Modal
    const filterButton = screen.getByText('FILTER');
    fireEvent.click(filterButton);
    const post_click_modal = screen.queryByRole('dialog');
    expect(post_click_modal).toBeInTheDocument();

    // Close Modal
    const cancelButton = screen.getByText('CANCEL');
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);

    //  Wait for page to rerender
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument(), {
      timeout: 2000,
    });
  });

  xit('should call onApplyFilters when filters are applied', async () => {
    const filterButton = screen.getByText('FILTER');
    fireEvent.click(filterButton);

    const applyFiltersButton = screen.getByText('APPLY FILTERS');
    expect(applyFiltersButton).toBeInTheDocument();
    fireEvent.click(applyFiltersButton);

    await waitFor(() => expect(mockProps.onApplyFilters).toHaveBeenCalled(), {
      timeout: 2000,
    });
  });

  xit('should call onApplyFilters when date range is updated', () => {
    const applyButton = screen.getByText('UPDATE PERIOD');
    fireEvent.click(applyButton);

    expect(mockProps.onApplyFilters).toHaveBeenCalled();
  });

  xit('should call removeItem when a chip is removed in ChipContainer', async () => {
    // Add a chip to the ChipContainer
    const filterButton = screen.getByText('FILTER');
    fireEvent.click(filterButton);

    const addItemInput = screen.getByPlaceholderText('Add an item');
    fireEvent.change(addItemInput, { target: { value: 'Test Item' } });
    fireEvent.keyDown(addItemInput, { key: 'Enter', code: 'Enter' });

    const applyFiltersButton = screen.getByText('APPLY FILTERS');
    fireEvent.click(applyFiltersButton);

    // Remove the chip
    const chipDeleteButton = screen.getByTestId('chip-delete-button');
    fireEvent.click(chipDeleteButton);

    expect(mockProps.removeItem).toHaveBeenCalled();
  });
});
