import React from 'react';
import { render, screen, fireEvent, act, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FeatureFlagFormModal } from './feature-flag-form-modal';
import { generateFlagId } from '../../utils';

describe('FeatureFlagFormModal component', () => {
  const onCloseMock = jest.fn();
  const onSubmitMock = jest.fn();

  const availableModules = ['module1', 'banana'];
  const formValues = {
    module: 'module1',
    title: 'Test Title',
    enabled: true,
    description: 'Test Description',
    id: '123',
  };

  it('renders the component with default props', async () => {
    await act(async () => {
      render(<FeatureFlagFormModal open={true} onClose={onCloseMock} onSubmit={onSubmitMock} />);
    });

    // Check if the title is rendered correctly
    expect(screen.getByText('Create Feature Flag')).toBeInTheDocument();

    // Check if the cancel button is rendered with default text "Cancel"
    expect(screen.getByText('Cancel')).toBeInTheDocument();

    // Check if the confirm button is rendered with default text "Create Flag"
    expect(screen.getByText('Create Flag')).toBeInTheDocument();

    // Check if the module autocomplete field is rendered
    expect(screen.getByLabelText('Feature Module')).toBeInTheDocument();

    // Check if the title textfield is rendered
    expect(within(screen.getByTestId('FtFlag--title-field')).getByLabelText('Title')).toBeInTheDocument();

    // Check if the enabled checkbox is rendered
    expect(screen.getByLabelText('Enabled')).toBeInTheDocument();

    // Check if the description textfield is rendered
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('renders the component with custom props', async () => {
    await act(async () => {
      render(
        <FeatureFlagFormModal
          open={true}
          availableModules={availableModules}
          formValues={formValues}
          mode="update"
          onClose={onCloseMock}
          onSubmit={onSubmitMock}
        />
      );
    });

    expect(screen.getByText('Update Feature Flag')).toBeInTheDocument();

    expect(screen.getByText('Cancel')).toBeInTheDocument();

    expect(screen.getByText('Update Flag')).toBeInTheDocument();

    // TODO - figure out how to test the autocomplete input
    // expect(screen.getByLabelText('Feature Module')).toBeInTheDocument();

    expect(within(screen.getByTestId('FtFlag--title-field')).getByLabelText('Title')).toHaveValue(
      formValues.title.toUpperCase()
    );

    expect(screen.getByLabelText('Enabled')).toBeChecked();

    expect(screen.getByLabelText('Description')).toHaveValue('Test Description');
  });

  it('calls onClose when clicking on the cancel button', () => {
    render(<FeatureFlagFormModal open={true} onClose={onCloseMock} onSubmit={onSubmitMock} />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls onSubmit when submitting the form', async () => {
    const user = userEvent.setup();

    await act(async () => {
      render(<FeatureFlagFormModal open={true} onClose={onCloseMock} onSubmit={onSubmitMock} />);
    });

    // form needs to be edited/dirty to be submittable
    expect(screen.getByText('Create Flag')).toBeDisabled();

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

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
      expect(onSubmitMock).toHaveBeenCalledWith(
        {
          enabled: true,
          module: newModule,
          title: newFlagTitle.toUpperCase(),
          description: newDescription,
          id: generateFlagId({ title: newFlagTitle, module: newModule, appPrefix: 'MMS' }),
        },
        'create'
      );
    });
  });

  it('renders the flag module and title field as readonly when updating', async () => {
    const user = userEvent.setup();

    await act(async () => {
      render(
        <FeatureFlagFormModal
          open={true}
          availableModules={availableModules}
          formValues={formValues}
          mode="update"
          onClose={onCloseMock}
          onSubmit={onSubmitMock}
        />
      );
    });

    const moduleSelectInput = screen.getByTestId('autocomplete').querySelector('input') as HTMLElement;
    expect(moduleSelectInput).toBeDisabled();
    expect(moduleSelectInput).toHaveAttribute('readonly', '');

    const inputElemTitle = screen.getByTestId('FtFlag--title-field').querySelector('input') as HTMLInputElement;
    expect(inputElemTitle).toBeDisabled();

    const checkbox = screen.getByLabelText('Enabled');
    await user.click(checkbox);
    const newDescription = 'Allow everyon to eat bananas';
    const descInput = screen
      .getByTestId('FtFlag--description-field')
      .querySelector("textarea[name='description']") as HTMLInputElement;
    await user.clear(descInput);
    await user.type(descInput, newDescription);

    // Submit the form
    await user.click(screen.getByText('Update Flag'));

    // Check if onSubmit function is called
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
      expect(onSubmitMock).toHaveBeenCalledWith(
        {
          enabled: !formValues.enabled,
          description: newDescription,
          module: formValues.module,
          title: formValues.title,
          id: formValues.id,
        },
        'update'
      );
    });
  });

  it('renders all fields as readonly when deleting and submits correctly', async () => {
    const user = userEvent.setup();

    await act(async () => {
      render(
        <FeatureFlagFormModal
          open={true}
          availableModules={availableModules}
          formValues={formValues}
          mode="delete"
          onClose={onCloseMock}
          onSubmit={onSubmitMock}
        />
      );
    });

    const moduleSelectInput = screen.getByTestId('autocomplete').querySelector('input') as HTMLElement;
    expect(moduleSelectInput).toBeDisabled();
    expect(moduleSelectInput).toHaveAttribute('readonly', '');

    const inputElemTitle = screen.getByTestId('FtFlag--title-field').querySelector('input') as HTMLInputElement;
    expect(inputElemTitle).toBeDisabled();

    const checkboxInput = screen.getByLabelText('Enabled');
    expect(checkboxInput).toBeDisabled();

    const descInput = screen
      .getByTestId('FtFlag--description-field')
      .querySelector("textarea[name='description']") as HTMLInputElement;
    expect(descInput).toBeDisabled();

    // Submit the form
    await user.click(screen.getByText('Delete Flag'));

    // Check if onSubmit function is called
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
      expect(onSubmitMock).toHaveBeenCalledWith(formValues, 'delete');
    });
  });
});
