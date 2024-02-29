import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import { FeatureFlagManager } from './ft-flag-page';

describe('FeatureFlagManager', () => {
  const mockFlags = [
    { id: 'flag1', module: 'module1', title: 'Flag 1', enabled: true, description: 'Description 1' },
    { id: 'flag2', module: 'module2', title: 'Flag 2', enabled: false, description: 'Description 2' },
  ];

  test('renders FeatureFlagManager component', async () => {
    const onUpdateFlags = jest.fn();

    const { getByText, getByTestId } = render(
      <FeatureFlagManager featureFlags={mockFlags} onUpdateFlags={onUpdateFlags} />
    );

    const newFlagButton = getByText('NEW FLAG');
    expect(newFlagButton).toBeInTheDocument();

    // Simulate click on "NEW FLAG" button
    fireEvent.click(newFlagButton);

    // Assert the presence of "FeatureFlagFormModal" component
    await waitFor(() => {
      expect(getByTestId('FeatureFlagFormModal-create')).toBeInTheDocument();
    });

    // Other assertions can be added as needed based on the specific functionality of the component
  });
});
