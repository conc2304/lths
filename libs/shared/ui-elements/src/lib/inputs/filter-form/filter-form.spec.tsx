import { RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

import { FilterForm } from './index';
import { formSchemaMock, formStateMock } from './mockData';

describe('FilterForm', () => {
  const mockFilterSchema = formSchemaMock;
  const mockFormState = formStateMock;
  const modalTitle = 'Apply Filter Test';
  const chipTitle = 'Selected Filters Test';
  const mockProps = {
    title: modalTitle,
    chipTitle: chipTitle,
    filterSchema: mockFilterSchema,
    onApplyFilters: jest.fn(),
    onChange: jest.fn(),
    onClose: jest.fn(),
    onClearFilters: jest.fn(),
    onCancel: jest.fn(),
    formState: mockFormState,
    onRemoveItem: jest.fn(),
    onAddItem: jest.fn(),
    onAddGroupItems: jest.fn(),
    onClearGroup: jest.fn(),
    open: true,
  };

  it('renders the FilterForm with correct components and buttons', () => {
    render(RBThemeProvider({ children: <FilterForm {...mockProps} /> }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(modalTitle)).toBeInTheDocument();
    expect(screen.getByText(chipTitle)).toBeInTheDocument();

    const clearFiltersButton = screen.getByText('CLEAR ALL FILTERS');
    fireEvent.click(clearFiltersButton);
    expect(mockProps.onClearFilters).toHaveBeenCalledTimes(1);

    const cancelButton = screen.getByText('CANCEL');
    fireEvent.click(cancelButton);
    expect(mockProps.onCancel).toHaveBeenCalledTimes(1);

    const applyFiltersButton = screen.getByText('APPLY FILTERS');
    fireEvent.click(applyFiltersButton);
    expect(mockProps.onApplyFilters).toHaveBeenCalledTimes(1);
  });
});
