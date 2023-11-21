import React, { ReactNode } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import { render, within, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import { Provider } from 'react-redux';
import mockConfigureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as Mms_DA from '@lths/features/mms/data-access';
import * as Shared_DA from '@lths/shared/data-access';
import { api } from '@lths/shared/data-access';
import * as toastServiceModule from '@lths/shared/ui-elements';
import { getCountryData } from '@lths/shared/utils';

import EditProfilePage from './edit-profile-page';

const middlewares = [thunk];
const mockStore = mockConfigureStore(middlewares);

// !! We are mocking this module because its jest is having trouble finding it
jest.mock('mui-tel-input', () => ({
  MuiTelInput: ({ value, onChange, onBlur }) => (
    <div data-testid="phone-number--mock">
      <input
        id="edit-profile--phone-number"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name="phone_number"
        type="string"
      />
    </div>
  ),
  matchIsValidTel: (): boolean => {
    return true;
  },
}));

describe('EditProfilePage ', () => {
  // Module and Method mocking
  const useUpdateUserMutationMock = jest.spyOn(Shared_DA, 'useUpdateUserMutation');
  const useAppSelectorMock = jest.spyOn(Mms_DA, 'useAppSelector');
  const selectUserIdMock = jest.spyOn(Mms_DA, 'selectUserId');

  const userUpdateMock = jest.fn();
  userUpdateMock.mockImplementation(() => ({
    unwrap: jest.fn().mockResolvedValue({ success: true }),
  }));
  // @ts-expect-error - this is expected
  useUpdateUserMutationMock.mockReturnValue([userUpdateMock]);

  toastServiceModule.toastQueueService.addToastToQueue = jest.fn();

  let store: MockStoreEnhanced;

  const userIdMock = '123';
  const initialUserState = {
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    username: 'johnny',
    phone_number: '1234567890',
    date_of_birth: '1990-06-25',
    city: 'New York',
    country: 'Canada',
    zip_code: '10001',
  };

  // Set up the initial state and mock functions
  beforeEach(() => {
    useUpdateUserMutationMock.mockClear();
    useAppSelectorMock.mockClear();
    selectUserIdMock.mockClear();
    selectUserIdMock.mockReturnValue(userIdMock);

    store = mockStore({
      api: api.reducer,
      users: {
        user: initialUserState,
      },
    });
  });

  afterEach(() => {
    cleanup();
  });

  const renderWithWrappers = (component: ReactNode) => {
    return render(
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>{component}</LocalizationProvider>
      </Provider>,
      { wrapper: RBThemeProvider }
    );
  };

  it('initializes text fields  with values from state and form correctly', () => {
    // Arrange
    const { getByLabelText, getByText, getByTestId } = renderWithWrappers(<EditProfilePage />);

    // Act
    // N/A

    // Assert
    expect(getByLabelText('First Name').querySelector('input')).toHaveValue(initialUserState.first_name);
    expect(getByLabelText('Last Name').querySelector('input')).toHaveValue(initialUserState.last_name);
    expect(getByLabelText('Email').querySelector('input')).toHaveValue(initialUserState.email);
    expect(getByLabelText('Username').querySelector('input')).toHaveValue(initialUserState.username);
    expect(getByLabelText('Date of Birth').querySelector('input')).toHaveValue(
      format(
        new Date(initialUserState.date_of_birth).setDate(new Date(initialUserState.date_of_birth).getUTCDate()),
        'MM/dd/yyyy'
      )
    );
    expect(getByLabelText('City').querySelector('input')).toHaveValue(initialUserState.city);
    expect(getByLabelText('Country').querySelector('input')).toHaveValue(initialUserState.country);
    expect(getByLabelText('Zip Code').querySelector('input')).toHaveValue(initialUserState.zip_code);
    expect(getByTestId('phone-number--mock').querySelector('input')).toHaveValue(initialUserState.phone_number);

    const submitButton = getByText('UPDATE');
    expect(submitButton).toBeDisabled();
    const cancelButton = getByText('CANCEL');
    expect(cancelButton).toBeDisabled();
  });

  it('fills and submits the form correctly', async () => {
    // Arrange

    const user = userEvent.setup();
    const { getByLabelText, getByText, getByTestId } = renderWithWrappers(<EditProfilePage />);

    // Act
    // Update Form
    const fnElem = getByLabelText('First Name').querySelector('input');
    const mockFirstName = 'Banana';
    await user.clear(fnElem);
    await user.type(fnElem, mockFirstName);

    const lnElem = getByLabelText('Last Name').querySelector('input');
    const mockLastName = 'Pijama';
    await user.clear(lnElem);
    await user.type(lnElem, mockLastName);
    expect(lnElem).toHaveValue(mockLastName);

    const emElem = getByLabelText('Email').querySelector('input');
    const mockEmail = 'pijama@banana.com';
    await user.clear(emElem);
    await user.type(emElem, mockEmail);
    expect(emElem).toHaveValue(mockEmail);

    const unElem = getByLabelText('Username').querySelector('input');
    const mockUsername = 'BananaMan4';
    await user.clear(unElem);
    await user.type(unElem, mockUsername);
    expect(unElem).toHaveValue(mockUsername);

    const dobElem = getByLabelText('Date of Birth').querySelector('input');
    const mockDob = '06/30/2000';
    await user.clear(dobElem);
    await user.type(dobElem, mockDob);
    expect(dobElem).toHaveValue(mockDob);

    const cityElem = getByLabelText('City').querySelector('input');
    const mockCity = 'New Bananaham';
    await user.clear(cityElem);
    await user.type(cityElem, mockCity);
    expect(cityElem).toHaveValue(mockCity);

    const zipElem = getByLabelText('Zip Code').querySelector('input');
    const mockZip = '90210';
    await user.clear(zipElem);
    await user.type(zipElem, mockZip);
    expect(zipElem).toHaveValue(mockZip);

    const mockCountry = 'United States';
    const input = within(getByTestId('Country-Select--root')).getByRole('combobox');
    await user.type(input, mockCountry);
    await user.type(input, '{enter}');

    // Submit Form
    const submitButton = getByText('UPDATE');
    const cancelButton = getByText('CANCEL');
    expect(cancelButton).not.toBeDisabled();
    expect(submitButton).not.toBeDisabled();
    await user.click(submitButton);

    // Assert
    expect(userUpdateMock).toHaveBeenCalledTimes(1);
    expect(userUpdateMock).toHaveBeenCalledWith({
      ...initialUserState,
      first_name: mockFirstName,
      last_name: mockLastName,
      date_of_birth: '2000-06-30',
      city: mockCity,
      country: mockCountry,
      zip_code: mockZip,
      email: mockEmail,
      username: mockUsername,
      userId: userIdMock,
    });

    await waitFor(() => {
      expect(toastServiceModule.toastQueueService.addToastToQueue).toHaveBeenCalledWith(
        'Profile successfully updated',
        {
          type: 'success',
        }
      );
      expect(cancelButton).toBeDisabled();
      expect(submitButton).toBeDisabled();
    }, {});
  });

  describe('EditProfilePage Form Validation', () => {
    it('displays required error for first name when it is not provided', async () => {
      // Arrange
      const user = userEvent.setup();
      const { getByLabelText, queryByText, getByText } = renderWithWrappers(<EditProfilePage />);
      const errorText = 'Required';
      expect(queryByText(errorText)).toBeNull();

      // Act
      // Update Form
      const parent = getByLabelText('First Name');
      const input = parent.querySelector('input');
      await user.clear(input);
      await user.tab();

      // Assert
      await waitFor(() => {
        expect(within(parent).getByText(errorText)).toBeInTheDocument();
        const submitButton = getByText('UPDATE');
        expect(submitButton).toBeDisabled();
        const cancelButton = getByText('CANCEL');
        expect(cancelButton).not.toBeDisabled();
      });
    });

    it('displays too short error for first name when it is too short', async () => {
      // Arrange
      const user = userEvent.setup();
      const { getByLabelText, queryByText, getByText } = renderWithWrappers(<EditProfilePage />);
      const errorText = 'Too short';
      expect(queryByText(errorText)).toBeNull();

      // Act
      const parent = getByLabelText('First Name');
      const input = parent.querySelector('input');
      await user.clear(input);
      await user.type(input, 'A');
      await user.tab();

      // Assert
      await waitFor(() => {
        expect(within(parent).getByText(errorText)).toBeInTheDocument();
        const submitButton = getByText('UPDATE');
        expect(submitButton).toBeDisabled();
        const cancelButton = getByText('CANCEL');
        expect(cancelButton).not.toBeDisabled();
      });
    });

    it('displays required error for last name when it is not provided', async () => {
      // Arrange
      const user = userEvent.setup();
      const { getByLabelText, queryByText } = renderWithWrappers(<EditProfilePage />);
      const errorText = 'Required';
      expect(queryByText(errorText)).toBeNull();

      // Act
      const parent = getByLabelText('Last Name');
      const input = parent.querySelector('input');
      await user.clear(input);
      await user.tab();

      await waitFor(() => {
        expect(within(parent).getByText(errorText)).toBeInTheDocument();
      });
    });

    it('displays invalid email error for email when it is not valid', async () => {
      // Arrange
      const user = userEvent.setup();
      const { getByLabelText, queryByText, getByText } = renderWithWrappers(<EditProfilePage />);
      const errorText = 'Invalid Email';
      expect(queryByText(errorText)).toBeNull();

      // Act
      const parent = getByLabelText('Email');
      const input = parent.querySelector('input');
      const mockEmail = 'not an email';
      await user.clear(input);
      await user.type(input, mockEmail);
      await user.tab();

      await waitFor(() => {
        expect(within(parent).getByText(errorText)).toBeInTheDocument();
        const submitButton = getByText('UPDATE');
        expect(submitButton).toBeDisabled();
        const cancelButton = getByText('CANCEL');
        expect(cancelButton).not.toBeDisabled();
      });
    });

    it('displays Username is too short when username is too short', async () => {
      // Arrange
      const user = userEvent.setup();
      const { getByLabelText, queryByText, getByText } = renderWithWrappers(<EditProfilePage />);
      const errorText = 'Username is too short';
      expect(queryByText(errorText)).toBeNull();

      // Act
      const parent = getByLabelText('Username');
      const input = parent.querySelector('input');
      const mockEmail = 'fail';
      await user.clear(input);
      await user.type(input, mockEmail);
      await user.tab();

      await waitFor(() => {
        expect(within(parent).getByText(errorText)).toBeInTheDocument();
        const submitButton = getByText('UPDATE');
        expect(submitButton).toBeDisabled();
        const cancelButton = getByText('CANCEL');
        expect(cancelButton).not.toBeDisabled();
      });
    });

    it('display error message when birthday is in the future', async () => {
      // Arrange
      // override system date for testing consitency
      jest.useFakeTimers({ advanceTimers: true });
      jest.setSystemTime(new Date('2000-01-01'));

      const user = userEvent.setup();
      const { getByLabelText, queryByText, getByText } = renderWithWrappers(<EditProfilePage />);
      const errorText = 'Are you from the future?!?';
      expect(queryByText(errorText)).toBeNull();

      // Act
      const parent = getByLabelText('Date of Birth');
      const input = parent.querySelector('input');
      const mockInput = '01/02/2001';
      await user.clear(input);
      await user.type(input, mockInput);
      await user.tab();

      await waitFor(() => {
        expect(within(parent).getByText(errorText)).toBeInTheDocument();
        const submitButton = getByText('UPDATE');
        expect(submitButton).toBeDisabled();
        const cancelButton = getByText('CANCEL');
        expect(cancelButton).not.toBeDisabled();
      });
      jest.useRealTimers();
    });

    it('display error message when birthday is too far in the past', async () => {
      // Arrange
      // override system date for testing consitency
      jest.useFakeTimers({ advanceTimers: true });
      jest.setSystemTime(new Date('2000-01-01'));

      const user = userEvent.setup();
      const { getByLabelText, queryByText, getByText } = renderWithWrappers(<EditProfilePage />);
      const errorText = "You're not that old!";
      expect(queryByText(errorText)).toBeNull();

      // Act
      const parent = getByLabelText('Date of Birth');
      const input = parent.querySelector('input');
      const mockInput = '01/02/1849';
      await user.clear(input);
      await user.type(input, mockInput);
      await user.tab();

      await waitFor(() => {
        expect(within(parent).getByText(errorText)).toBeInTheDocument();
        const submitButton = getByText('UPDATE');
        expect(submitButton).toBeDisabled();
        const cancelButton = getByText('CANCEL');
        expect(cancelButton).not.toBeDisabled();
      });
      jest.useRealTimers();
    });
  });

  it('validates the zip code correctly', async () => {
    // Arrange
    initialUserState.country = null;
    const user = userEvent.setup();
    const { queryByText, getByTestId, getByLabelText, getByText } = renderWithWrappers(<EditProfilePage />);
    const invalidZipCodeRegex = /Invalid \w* Zip Code/i;
    expect(queryByText(invalidZipCodeRegex)).toBeNull();

    // Act pt.I
    // it should accept any value when the country is null
    const parent = getByLabelText('Zip Code');
    const input = parent.querySelector('input');
    const mockBadInput = '9FKGE';
    await user.clear(input);
    await user.type(input, mockBadInput);
    await user.tab();
    await waitFor(() => {
      expect(queryByText(invalidZipCodeRegex)).toBeNull();
    });

    // Act pt.II
    // on setting the country, it should revalidate the zip code for that country
    const countryParent = getByTestId('Country-Select--root');
    const countryInput = within(countryParent).getByRole('combobox') as HTMLInputElement;
    const mockCountryInput = 'United States';
    expect(countryInput).toHaveValue('');
    await user.type(countryInput, mockCountryInput);
    await user.type(countryInput, '{enter}');

    const { code: countryCode } = getCountryData({ country: mockCountryInput });
    const errorText = `Invalid ${countryCode} Zip Code`;

    // Assert
    await waitFor(() => {
      expect(within(parent).getByText(errorText)).toBeInTheDocument();
      const submitButton = getByText('UPDATE');
      expect(submitButton).toBeDisabled();
      const cancelButton = getByText('CANCEL');
      expect(cancelButton).not.toBeDisabled();
    });
  });
});
