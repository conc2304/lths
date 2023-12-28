import React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { Countries, CountryType } from '@lths/shared/utils';

import { CountrySelect } from './country-select';

// ? Note - this file is using snake case because for some reason typescript throws errors for jest when it is kebab cased

describe('CountrySelect', () => {
  it('renders the component with the provided label', () => {
    const labelText = 'Select Country';
    const { getByTestId, getByLabelText } = render(<CountrySelect label={labelText} />);
    expect(getByTestId('Country-Select--root')).toBeInTheDocument();
    expect(getByLabelText(labelText));
  });

  it('renders options correctly', async () => {
    const user = userEvent.setup();

    const { getByLabelText, getAllByRole } = render(<CountrySelect countryOptions={[...Countries]} />);

    await user.click(getByLabelText('Open'));
    const options = getAllByRole('option');
    expect(options.length).toBe(Countries.length);
  });

  it('calls onChange with correct value when an option is selected', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    const { getAllByRole, getByLabelText } = render(
      <CountrySelect onChange={handleChange} countryOptions={[...Countries]} />
    );

    const sortedOptions = [...Countries].sort((a: CountryType, b: CountryType) => {
      if (a.suggested && !b.suggested) return -1;
      if (b.suggested && !a.suggested) return 1;
      return a.label.localeCompare(b.label);
    });

    await user.click(getByLabelText('Open'));
    await user.click(getAllByRole('option')[0]);

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][1]).toMatchObject(sortedOptions[0]);
  });

  it('sorts the countries with suggested countries on top', async () => {
    const user = userEvent.setup();

    const { getAllByRole, getByLabelText } = render(<CountrySelect />);
    await user.click(getByLabelText('Open'));
    const options = getAllByRole('option');
    const suggestedIndex = Countries.findIndex((c) => c.suggested);
    expect(options[0]).toHaveTextContent(Countries[suggestedIndex].label);
  });

  it('should select the country when passed as a prop', () => {
    const country = Countries.find((c) => c.code === 'AU') as CountryType;
    const { getByRole } = render(<CountrySelect value={country} />);
    const inputElem = getByRole('combobox') as HTMLInputElement;
    expect(inputElem.value).toBe(country.label);
  });

  it('calls onBlur when the autocomplete loses focus', () => {
    const handleBlur = jest.fn();
    const { getByRole } = render(<CountrySelect onBlur={handleBlur} />);

    const input = getByRole('combobox');

    act(() => {
      input.focus();
    });

    expect(input).toHaveFocus();
    act(() => {
      input.blur();
    });
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('displays the country code when showCountryCode is true', async () => {
    const user = userEvent.setup();

    const { getByLabelText, getAllByRole } = render(
      <CountrySelect showCountryCode={true} countryOptions={[...Countries]} />
    );

    await user.click(getByLabelText('Open'));

    const sortedOptions = [...Countries].sort((a: CountryType, b: CountryType) => {
      if (a.suggested && !b.suggested) return -1;
      if (b.suggested && !a.suggested) return 1;
      return a.label.localeCompare(b.label);
    });

    const options = getAllByRole('option');
    expect(options[0]).toHaveTextContent(`(${sortedOptions[0].code})`);
  });

  it('displays the phone code when showPhoneCode is true', async () => {
    const user = userEvent.setup();

    const { getByLabelText, getAllByRole } = render(
      <CountrySelect showPhoneCode={true} countryOptions={[...Countries]} />
    );

    await user.click(getByLabelText('Open'));

    const sortedOptions = [...Countries].sort((a: CountryType, b: CountryType) => {
      if (a.suggested && !b.suggested) return -1;
      if (b.suggested && !a.suggested) return 1;
      return a.label.localeCompare(b.label);
    });

    const options = getAllByRole('option');
    expect(options[0]).toHaveTextContent(`+${sortedOptions[0].phone}`);
  });

  it('displays the country flag when showCountryFlag is true', async () => {
    const user = userEvent.setup();

    const { getByLabelText, getAllByRole } = render(
      <CountrySelect showCountryFlag={true} countryOptions={[...Countries]} />
    );

    await user.click(getByLabelText('Open'));

    const sortedOptions = [...Countries].sort((a: CountryType, b: CountryType) => {
      if (a.suggested && !b.suggested) return -1;
      if (b.suggested && !a.suggested) return 1;
      return a.label.localeCompare(b.label);
    });

    const options = getAllByRole('option');
    const flag = within(options[0]).getByTestId('Country-Select--flag');
    expect(flag).toHaveAttribute('src', expect.stringContaining(sortedOptions[0].code.toLowerCase()));
  });

  it('filters countries based on user input', async () => {
    const user = userEvent.setup();

    const { getByRole, getByText } = render(<CountrySelect showCountryFlag={true} countryOptions={[...Countries]} />);

    const input = getByRole('combobox');
    await user.type(input, 'Andorra');

    const option = getByText('Andorra');
    expect(option).toBeInTheDocument();
  });

  it('allows navigation through options with keyboard', async () => {
    const user = userEvent.setup();

    const sortedOptions = [...Countries].sort((a: CountryType, b: CountryType) => {
      if (a.suggested && !b.suggested) return -1;
      if (b.suggested && !a.suggested) return 1;
      return a.label.localeCompare(b.label);
    });

    const { getByRole } = render(<CountrySelect showCountryFlag={true} countryOptions={[...Countries]} />);
    const input = getByRole('combobox') as HTMLInputElement;
    fireEvent.focus(input);

    await user.type(input, 'A');
    // for each down arrow increase the expected index
    let index = 0;
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    index++;
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    index++;
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(input.value).not.toBe('');
    expect(input.value).toBe(sortedOptions[index].label);
  });
});
