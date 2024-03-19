import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { render, fireEvent } from '@testing-library/react';

import { SelectLTHS } from './select';

describe('SelectLTHS', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const defaultProps = {
    options: options,
    value: options[0],
    onValueChange: jest.fn(),
  };

  it('renders without crashing', () => {
    render(<SelectLTHS {...defaultProps} />);
  });

  it('renders options correctly', () => {
    const { getByText } = render(<SelectLTHS {...defaultProps} />);
    options.forEach((option) => {
      expect(getByText(option.label)).toBeInTheDocument();
    });
  });

  it('calls onValueChange when an option is selected', () => {
    const handleValueChange = jest.fn();
    const { getByTestId } = render(<SelectLTHS {...defaultProps} onValueChange={handleValueChange} />);
    const select = getByTestId('Select-label--');
    fireEvent.change(select, { target: { value: JSON.stringify(options[1]) } } as SelectChangeEvent<
      string | number | null
    >);
    expect(handleValueChange).toHaveBeenCalledWith(options[1]);
  });

  it('renders helper text when provided', () => {
    const { getByText } = render(<SelectLTHS {...defaultProps} helperText="Helper text" />);
    expect(getByText('Helper text')).toBeInTheDocument();
  });

  it('renders placeholder when options are empty', () => {
    const { getByText } = render(<SelectLTHS {...defaultProps} options={[]} placeholder="Placeholder" />);
    expect(getByText('Placeholder')).toBeInTheDocument();
  });

  it('renders no options available text when options are empty and no placeholder is provided', () => {
    const { getByText } = render(<SelectLTHS {...defaultProps} options={[]} />);
    expect(getByText('No options available')).toBeInTheDocument();
  });
});
