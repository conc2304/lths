import React from 'react';
import { render, screen, fireEvent, act, within } from '@testing-library/react';

import { MultiSelectWithChip } from './select-component';

describe('MultiSelectWithChip component', () => {
  const options = [
    { id: '1', value: 'Option 1' },
    { id: '2', value: 'Option 2' },
    { id: '3', value: 'Option 3' },
  ];

  it('renders the component with default values', () => {
    render(<MultiSelectWithChip options={options} />);

    // Check if placeholder is rendered
    expect(screen.getByPlaceholderText('Show All')).toBeInTheDocument();
  });

  it('renders the component with custom placeholder', () => {
    render(<MultiSelectWithChip options={options} placeholder="Select an option" />);

    // Check if custom placeholder is rendered
    expect(screen.getByPlaceholderText('Select an option')).toBeInTheDocument();
  });

  it('show all of the menu options', async () => {
    const mockOnChange = jest.fn();
    const mockOnSelect = jest.fn();
    render(<MultiSelectWithChip options={options} onChange={mockOnChange} onSelect={mockOnSelect} />);

    const testOption = options[0];
    // Click on first menu item
    expect(screen.getByRole('button', { expanded: false })).toBeInTheDocument();
    act(() => {
      fireEvent.mouseDown(screen.getByRole('button', { expanded: false }));
    });

    // verify all of the options are in the dropdown menu
    for (const option of options) {
      expect(screen.getByRole('option', { name: option.value })).toBeInTheDocument();
    }

    screen.getByRole('option', { name: testOption.value });

    fireEvent.click(screen.getByRole('option', { name: testOption.value }));

    expect(mockOnChange).toHaveBeenCalledWith([[testOption.id.toString(), testOption.value]]);
    expect(mockOnSelect).toHaveBeenCalledWith([[testOption.id.toString(), testOption.value]]);
  });

  it('handles removal of items', async () => {
    const selectedOpt = options[0];
    const mockOnChange = jest.fn();
    const mockOnRemove = jest.fn();

    render(
      <MultiSelectWithChip
        options={options}
        value={[[selectedOpt.id, selectedOpt.value]]}
        onChange={mockOnChange}
        onRemove={mockOnRemove}
      />
    );

    const container = screen.getByTestId('MultiSelect--chip-container');

    expect(container).toBeInTheDocument();
    const chipOption = within(container).getByRole('button', { name: selectedOpt.value });
    // const chipOption = within(container).getByText(selectedOpt.value);
    expect(chipOption).toBeInTheDocument();

    act(() => {
      fireEvent.click(within(chipOption).getByTestId('CancelIcon'));
    });

    // we only had on item selected so 0 selected state is show all
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith([['all', 'Show All']]);
    expect(mockOnRemove).toHaveBeenCalled();
    expect(mockOnRemove).toHaveBeenCalledWith([['all', 'Show All']]);
  });
});
