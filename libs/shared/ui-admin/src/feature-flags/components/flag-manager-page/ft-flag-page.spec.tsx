import React from 'react';
import { render, waitFor, act, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FeatureFlagManager } from './ft-flag-page';
import { generateFlagId } from '../../utils';

describe('FeatureFlagManager', () => {
  const mockFlags = [
    { id: 'flag1', module: 'module1', title: 'Flag 1', enabled: true, description: 'Description 1' },
    { id: 'flag2', module: 'module2', title: 'Flag 2', enabled: false, description: 'Description 2' },
  ];
  const onUpdateFlags = jest.fn();

  it('renders FeatureFlagManager component', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<FeatureFlagManager featureFlags={mockFlags} onUpdateFlags={onUpdateFlags} />);
    });

    const newFlagButton = screen.getByText('New Flag');
    expect(newFlagButton).toBeInTheDocument();

    // verifty table loaded
    expect(screen.getByTestId('FtFlagTable--root')).toBeInTheDocument();

    await act(async () => {
      await user.click(newFlagButton);
    });

    // verify the create flag modal opens
    await waitFor(() => {
      expect(screen.getByText('Create Feature Flag')).toBeInTheDocument();
    });

    // close modal
    await user.click(screen.getByText('Cancel'));
    await waitFor(() => {
      expect(screen.queryByText('Create Feature Flag')).not.toBeInTheDocument();
    });
    // open edit flag modal
    await user.click(screen.queryAllByTestId('FtFlagTableRow--edit-btn')[0]);
    await waitFor(() => {
      expect(screen.queryByText('Update Feature Flag')).toBeInTheDocument();
    });
    // close modal

    await user.click(screen.getByText('Cancel'));
    await waitFor(() => {
      expect(screen.queryByText('Update Feature Flag')).not.toBeInTheDocument();
    });
    // open delete flag modal
    await user.click(screen.queryAllByTestId('FtFlagTableRow--edit-btn')[0]);
    await waitFor(() => {
      expect(screen.queryByText('Update Feature Flag')).toBeInTheDocument();
    });
  });

  it('handles creating a new feature flag', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<FeatureFlagManager featureFlags={mockFlags} onUpdateFlags={onUpdateFlags} />);
    });

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

    await act(async () => {
      await user.clear(descInput);
      await user.type(descInput, newDescription);
    });

    expect(screen.getByText('Create Flag')).not.toBeDisabled();

    // Submit the form
    await user.click(screen.getByText('Create Flag'));
    // Check if onupdate function is called
    await waitFor(() => {
      expect(onUpdateFlags).toHaveBeenCalledWith(
        {
          description: newDescription,
          enabled: true,
          module: newModule,
          title: newFlagTitle.toUpperCase(),
          id: generateFlagId({ title: newFlagTitle, module: newModule }),
        },
        'create'
      );
    });
  }, 50000); // increase timeout for ci pipeline

  it('handles updating a feature flag', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<FeatureFlagManager featureFlags={mockFlags} onUpdateFlags={onUpdateFlags} />);
    });

    // page renders by sorting by module, so find the first row by module
    const testFlag = mockFlags.sort((a, b) => {
      if (a.module > b.module) return 1;
      if (a.module < b.module) return -1;
      return 0;
    })[0];

    // open edit flag modal
    await user.click(screen.queryAllByTestId('FtFlagTableRow--edit-btn')[0]);

    // verify correct modal is open
    await waitFor(() => {
      expect(screen.getByText('Update Feature Flag')).toBeInTheDocument();
    });

    // verify modal is open with the correct flag data
    expect(within(screen.getByRole('dialog')).getByText(testFlag.description)).toBeInTheDocument();

    // Edit Flag fields
    const checkbox = screen.getByLabelText('Enabled');
    await user.click(checkbox);

    const descInput = screen
      .getByTestId('FtFlag--description-field')
      .querySelector("textarea[name='description']") as HTMLInputElement;
    const newDescription = 'Allow everyon to eat bananas';
    await user.clear(descInput);
    await user.type(descInput, newDescription);

    expect(screen.getByText('Update Flag')).not.toBeDisabled();

    await user.click(screen.getByText('Update Flag'));
    await waitFor(() => {
      expect(onUpdateFlags).toHaveBeenCalledWith(
        {
          ...testFlag,
          description: newDescription,
          enabled: !testFlag.enabled,
        },
        'update'
      );
    });
  });
  it('handles deleting a feature flag', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<FeatureFlagManager featureFlags={mockFlags} onUpdateFlags={onUpdateFlags} />);
    });

    // page renders by sorting by module, so find the first row by module
    const testFlag = mockFlags.sort((a, b) => {
      if (a.module > b.module) return 1;
      if (a.module < b.module) return -1;
      return 0;
    })[0];

    // open edit delete modal
    await user.click(screen.queryAllByTestId('FtFlagTableRow--delete-btn')[0]);

    // verify correct modal is open
    await waitFor(() => {
      expect(screen.getByText('Delete Feature Flag')).toBeInTheDocument();
    });

    // verify modal is open with the correct flag data
    expect(within(screen.getByRole('dialog')).getByText(testFlag.description)).toBeInTheDocument();

    expect(screen.getByText('Delete Flag')).not.toBeDisabled();

    await user.click(screen.getByText('Delete Flag'));
    await waitFor(() => {
      expect(onUpdateFlags).toHaveBeenCalledWith(testFlag, 'delete');
    });
  });
});
