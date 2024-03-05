import React from 'react';
import { render, waitFor, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { featureFlagsApi, useUpdateFeatureFlagsMutation } from '@lths/features/mms/data-access';
import { FeatureFlag, createFeatureFlagPayload, generateFlagId } from '@lths/shared/ui-admin';

import FeatureFlagPage from './index';

// mocking api interaction
jest.mock('@lths/features/mms/data-access', () => ({
  featureFlagsApi: {
    endpoints: {
      getFeatureFlags: {
        useQueryState: jest.fn(),
      },
    },
  },
  useUpdateFeatureFlagsMutation: jest.fn(),
}));

describe('FeatureFlagPage', () => {
  const featureFlagsData = {
    data: {
      _id: 'mockId',
      enum_values: [
        {
          name: 'MMS_MOCK--test-a',
          value: {
            title: 'MOCK ENABLED FLAG',
            id: 'MMS_MOCK--test-a',
            enabled: true,
            description: 'mock description for enabled',
            module: 'mocking',
          },
        },
        {
          name: 'MMS_MOCK--test-b',
          value: {
            title: 'MOCK DISABLED FLAG',
            id: 'MMS_MOCK--test-b',
            enabled: false,
            description: 'mock description for disabled',
            module: 'mocking',
          },
        },
      ],
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await act(async () => {
      (useUpdateFeatureFlagsMutation as jest.Mock).mockReturnValue([jest.fn(), {}]);
    });
  });

  it('renders the FeatureFlagManager component', async () => {
    (featureFlagsApi.endpoints.getFeatureFlags.useQueryState as jest.Mock).mockReturnValue({
      data: { enum_values: [] },
    });

    await act(async () => {
      await waitFor(() => {
        render(<FeatureFlagPage />);
      });
    });
    expect(screen.getByTestId('MMS-Feature-Flag-Page--root')).toBeInTheDocument();
  });

  it('handles flag updates correctly', async () => {
    const user = userEvent.setup();

    const mockUpdateFeatureFlagsCall = jest.fn();
    (useUpdateFeatureFlagsMutation as jest.Mock).mockReturnValue([mockUpdateFeatureFlagsCall]);

    (featureFlagsApi.endpoints.getFeatureFlags.useQueryState as jest.Mock).mockReturnValue(featureFlagsData);

    await act(async () => {
      await waitFor(() => {
        render(<FeatureFlagPage />);
      });
    });

    // create a new flag and by fill out form and submitting
    const newFlagButton = screen.getByText('New Flag');
    expect(newFlagButton).toBeInTheDocument();

    await act(async () => {
      await user.click(newFlagButton);
    });

    // verify the create flag modal opens
    await waitFor(() => {
      expect(screen.getByText('Create Feature Flag')).toBeInTheDocument();
    });

    // Fill out form
    const newModule = 'Banana';
    const moduleInput = screen.getByTestId('autocomplete').querySelector('input') as HTMLElement;
    await user.clear(moduleInput);
    await user.type(moduleInput, newModule);

    expect(screen.getByLabelText('Enabled')).not.toBeChecked();

    const inputElemtTitle = screen.getByTestId('FtFlag--title-field').querySelector('input') as HTMLInputElement;
    const newFlagTitle = 'Banana Eater';
    await user.clear(inputElemtTitle);
    await user.type(inputElemtTitle, newFlagTitle);

    const checkbox = screen.getByLabelText('Enabled');
    await user.click(checkbox);

    const descInput = screen
      .getByTestId('FtFlag--description-field')
      .querySelector("textarea[name='description']") as HTMLInputElement;
    const newDescription = 'Allow everyon to eat bananas';
    await user.clear(descInput);
    await user.type(descInput, newDescription);

    expect(screen.getByText('Create Flag')).not.toBeDisabled();

    // Submit the form
    await user.click(screen.getByText('Create Flag'));

    const newFtFlag: FeatureFlag = {
      description: newDescription,
      enabled: true,
      module: newModule,
      title: newFlagTitle.toUpperCase(),
      id: generateFlagId({ title: newFlagTitle, module: newModule }),
    };
    // ui uses reformatted api data structure
    const frontEndDataFtFlags = featureFlagsData.data.enum_values.map((f) => f.value);
    // wait for the flag update to be processed
    await waitFor(() => {
      // Check if api call is made with the correct payload
      expect(mockUpdateFeatureFlagsCall).toHaveBeenCalledWith({
        id: featureFlagsData.data._id,
        body: { enum_values: createFeatureFlagPayload(newFtFlag, frontEndDataFtFlags as FeatureFlag[]) },
      });
    });
  });
});
