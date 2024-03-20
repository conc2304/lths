import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EventStateFormItem } from './event-state-form-item';

describe('EventStateFormItem', () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    onChange: mockOnChange,
    title: 'Test Title',
    desc: 'Test Description',
    value: 2,
    editable: true,
    id: 'test-id',
    minHours: 0,
    maxHours: 24,
  };

  it('renders the component with given props', () => {
    const { container, getByText, getByRole } = render(<EventStateFormItem {...defaultProps} />);

    const formLabel = getByText(defaultProps.title);
    const input = getByRole('textbox').querySelector('input');
    const inputAdornment = getByText('hrs');
    const description = getByText(defaultProps.desc);

    expect(container).toBeInTheDocument();
    expect(formLabel).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(inputAdornment).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    // Check if input value is correct
    expect(input).toHaveValue(defaultProps.value);
  });

  it('calls onChange when input value changes', async () => {
    const user = userEvent.setup();

    render(<EventStateFormItem {...defaultProps} />);

    const input = screen.getByRole('textbox').querySelector('input');

    // Change input value
    if (!input) throw new Error('No Input element found on page');

    const testValue = 4;
    await user.clear(input);
    mockOnChange.mockClear();
    await user.type(input, testValue.toString());
    await user.tab();

    // Check if onChange was called with the updated value
    waitFor(() => {
      expect(mockOnChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ target: expect.objectContaining({ value: testValue }) })
      );
    });
  });

  it('renders non editable if item it not editable', () => {
    const { getByTestId } = render(<EventStateFormItem {...defaultProps} editable={false} />);

    // Check if description is italic
    expect(getByTestId('EventState--form-item-uneditable')).toBeInTheDocument();
  });
});
