import { render, within, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
    onchange: jest.fn(),
  };

  it('renders without crashing', () => {
    render(<SelectLTHS {...defaultProps} />);
  });

  it('renders options correctly and handles change', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    const [label, placeholder] = ['Label', 'Placeholder'];
    const { getByTestId } = render(
      <SelectLTHS {...defaultProps} onChange={handleChange} placeholder={placeholder} label={label} />
    );

    expect(getByTestId('SelectLTHS--label')).toBeInTheDocument();
    expect(getByTestId('SelectLTHS--label')).toHaveTextContent(label);

    // open the menu
    const wrapper = getByTestId('SelectLTHS--selector');
    const dropDownButton = within(wrapper).getByRole('button', { expanded: false });
    expect(dropDownButton).toBeInTheDocument();
    await user.click(dropDownButton);

    options.forEach(async (option) => {
      await waitFor(() => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });

    expect(screen.getByText(placeholder)).toBeInTheDocument();

    await user.click(screen.getByText(options[1].label));

    expect(handleChange).toHaveBeenCalledWith(options[1]);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders helper text when provided', () => {
    const { getByText } = render(<SelectLTHS {...defaultProps} helperText="Helper text" />);
    expect(getByText('Helper text')).toBeInTheDocument();
  });

  it('renders no options available text when options are empty and no placeholder is provided', async () => {
    const user = userEvent.setup();
    const { getByText, getByTestId } = render(<SelectLTHS {...defaultProps} options={[]} />);
    const wrapper = getByTestId('SelectLTHS--selector');
    const dropDownButton = within(wrapper).getByRole('button', { expanded: false });
    expect(dropDownButton).toBeInTheDocument();
    await user.click(dropDownButton);

    expect(getByText('No options available')).toBeInTheDocument();
  });
});
