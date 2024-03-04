import React from 'react';
import { render, screen, fireEvent, act, within } from '@testing-library/react';

import { SelectChipRenderer } from './select-chip-renderer';
import { SelectOptionInternal } from './types';

describe('SelectChipRenderer component', () => {
  const selectedItems: SelectOptionInternal[] = [
    ['1', 'Option 1'],
    ['2', 'Option 2'],
    ['3', 'Option 3'],
  ];

  const onRemoveItemMock = jest.fn();

  it('renders the component with selected items as chips', () => {
    render(<SelectChipRenderer selectedItems={selectedItems} onRemoveItem={onRemoveItemMock} />);

    // Check if all selected items are rendered as chips

    for (const option of selectedItems) {
      expect(screen.getByText(option[1])).toBeInTheDocument();
    }
  });

  it('calls onRemoveItem when clicking on a chip', () => {
    render(<SelectChipRenderer selectedItems={selectedItems} onRemoveItem={onRemoveItemMock} />);

    const removedOption = selectedItems[0];
    // Click on the chip close button to remove it
    act(() => {
      const chipOption = screen.getByRole('button', { name: removedOption[1].toString() });
      expect(chipOption).toBeInTheDocument();
      fireEvent.click(within(chipOption).getByTestId('CancelIcon'));
    });

    // Check if onRemoveItem is called with the correct ID
    expect(onRemoveItemMock).toHaveBeenCalledWith(removedOption[0]);
  });

  it('renders the "MORE" chip when there are more selected items than the chip limit', () => {
    const longSelectedItems: SelectOptionInternal[] = [
      ['1', 'Option 1'],
      ['2', 'Option 2'],
      ['3', 'Option 3'],
      ['4', 'Option 4'],
      ['5', 'Option 5'],
    ];

    const chipLimit = 3;
    render(
      <SelectChipRenderer selectedItems={longSelectedItems} onRemoveItem={onRemoveItemMock} chipLimit={chipLimit} />
    );

    const extraChipCount = longSelectedItems.length - chipLimit + 1; // the  MORE chip counts as a chip
    const expectedMoreText = `MORE (${extraChipCount})`;
    // Check if the "MORE" chip is rendered
    expect(screen.getByText(expectedMoreText)).toBeInTheDocument();
  });
});
