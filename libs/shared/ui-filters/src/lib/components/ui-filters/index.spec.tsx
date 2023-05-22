import { RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';

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
    // Arrange
    const initModal = screen.queryByRole('dialog');
    expect(initModal).toBeNull();

    // Open Modal
    const filterButton = screen.getByText('FILTER');
    fireEvent.click(filterButton);
    const post_click_modal = screen.queryByRole('dialog');
    expect(post_click_modal).toBeInTheDocument();

    // Close Modal
    const cancelButton = screen.getByText('CANCEL');
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);

    // Assert
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument(), {
      timeout: 2000,
    });
  });

  it('should call onApplyFilters when filters are applied', async () => {
    // Arrange
    const filterButton = screen.getByText('FILTER');
    fireEvent.click(filterButton);
    const applyFiltersButton = screen.getByText('APPLY FILTERS');
    expect(applyFiltersButton).toBeInTheDocument();

    // Act
    fireEvent.click(applyFiltersButton);
    // Assert
    waitFor(() => expect(mockProps.onApplyFilters).toHaveBeenCalled(), { timeout: 1000 });
  });

  it('should call onApplyFilters when date range is updated', async () => {
    // Arrange
    const applyButton = screen.getByText('UPDATE PERIOD');
    // Act
    fireEvent.click(applyButton);
    // Assert
    waitFor(() => expect(mockProps.onApplyFilters).toHaveBeenCalled(), { timeout: 1000 });
  });

  it('should call removeItem when a chip is removed in ChipContainer', async () => {
    // Arrange
    const filterButton = screen.getByText('FILTER');
    fireEvent.click(filterButton);

    const chipContainer = screen.getByTestId('chip-container-modal');
    const testElem = within(chipContainer).getAllByRole('button')[0];
    const chipLabel = testElem.textContent;
    const deleteButton = within(testElem).getByTestId('CloseIcon');
    expect(within(chipContainer).getByText(chipLabel as string)).toBeInTheDocument();

    // Act
    fireEvent.click(deleteButton);

    // Assert
    waitFor(
      () => {
        expect(mockProps.removeItem).toHaveBeenCalled();
        expect(within(chipContainer).getByText(chipLabel as string)).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});
