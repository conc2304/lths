import React from 'react';
import { render, within, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getUniqueValuesByKey } from '@lths/shared/utils';

import { FeatureFlagTable } from './feature-flag-table';
import { FeatureFlag } from '../../types';

describe('FeatureFlagTable', () => {
  const mockFlags: FeatureFlag[] = [
    { id: '1', module: 'Module A', title: 'Flag 1', enabled: true, description: 'Description 1' },
    { id: '2', module: 'Module B', title: 'Flag 2', enabled: false, description: 'Description 2' },
  ];

  const handleEditFlagClick = jest.fn();
  const handleDeleteFlagClick = jest.fn();

  it('renders FeatureFlagTable component', () => {
    const { getByTestId } = render(
      <FeatureFlagTable
        featureFlags={mockFlags}
        onEditFlagClick={handleEditFlagClick}
        onDeleteFlagClick={handleDeleteFlagClick}
      />
    );
    const tableRoot = getByTestId('FtFlagTable--root');
    expect(tableRoot).toBeInTheDocument();

    // assert all search filters are present
    expect(getByTestId('MultiSelectChip--root')).toBeInTheDocument();
    expect(getByTestId('Searchbar--root')).toBeInTheDocument();
    const fltrByEnabledWrapper = getByTestId('FtFlagTable--enabled-filter');
    expect(fltrByEnabledWrapper).toBeInTheDocument();
    expect(within(fltrByEnabledWrapper).getByTestId('FtFlagTable--enabled-filter-toggle')).toBeInTheDocument();
    expect(within(fltrByEnabledWrapper).queryAllByRole('button')).toHaveLength(2);
    expect(within(fltrByEnabledWrapper).getByText('Enabled')).toBeInTheDocument();
    expect(within(fltrByEnabledWrapper).getByText('Disabled')).toBeInTheDocument();
  });

  it('calls handleEditFlagClick when edit button is clicked', async () => {
    const user = userEvent.setup();

    const { queryAllByTestId } = render(
      <FeatureFlagTable
        featureFlags={mockFlags}
        onEditFlagClick={handleEditFlagClick}
        onDeleteFlagClick={handleDeleteFlagClick}
      />
    );

    const editButton = queryAllByTestId('FtFlagTableRow--edit-btn')[0];
    await user.click(editButton);
    expect(handleEditFlagClick).toHaveBeenCalledWith(mockFlags[0]);
  });

  it('calls handleDeleteFlagClick when delete button is clicked', async () => {
    const user = userEvent.setup();

    const { queryAllByTestId } = render(
      <FeatureFlagTable
        featureFlags={mockFlags}
        onEditFlagClick={handleEditFlagClick}
        onDeleteFlagClick={handleDeleteFlagClick}
      />
    );

    const deleteButton = queryAllByTestId('FtFlagTableRow--delete-btn')[0];
    await user.click(deleteButton);
    expect(handleDeleteFlagClick).toHaveBeenCalledWith(mockFlags[0]);
  });

  it('renders filtered flags based on search text', async () => {
    const user = userEvent.setup();
    const { getByTestId, queryByText, getByText } = render(
      <FeatureFlagTable
        featureFlags={mockFlags}
        onEditFlagClick={handleEditFlagClick}
        onDeleteFlagClick={handleDeleteFlagClick}
      />
    );

    expect(getByText('Reset')).toBeDisabled();

    const searchbarInput = getByTestId('Searchbar--root').querySelector('input') as HTMLElement;
    expect(searchbarInput).toHaveAttribute('value', '');

    expect(queryByText('Flag 1')).toBeInTheDocument();
    expect(queryByText('Flag 2')).toBeInTheDocument();

    await user.type(searchbarInput, 'flag 1');
    await waitFor(() => {
      expect(queryByText('Flag 1')).toBeInTheDocument();
      expect(queryByText('Flag 2')).not.toBeInTheDocument();
    });

    await user.clear(searchbarInput);
    await waitFor(() => {
      expect(queryByText('Flag 1')).toBeInTheDocument();
      expect(queryByText('Flag 2')).toBeInTheDocument();
    });

    await user.type(searchbarInput, 'flag');
    await waitFor(() => {
      expect(queryByText('Flag 1')).toBeInTheDocument();
      expect(queryByText('Flag 2')).toBeInTheDocument();
    });

    await user.clear(searchbarInput);
    await user.type(searchbarInput, 'banana');
    await waitFor(() => {
      expect(queryByText('Flag 1')).not.toBeInTheDocument();
      expect(queryByText('Flag 2')).not.toBeInTheDocument();
    });

    await user.click(getByText('Reset'));
    await waitFor(() => {
      expect(queryByText('Flag 1')).toBeInTheDocument();
      expect(queryByText('Flag 2')).toBeInTheDocument();
    });
  });

  it('renders filtered flags based on "enabled/disabled" toggle', async () => {
    const user = userEvent.setup();
    const { getByRole, queryByText, getByTestId, getByText } = render(
      <FeatureFlagTable
        featureFlags={mockFlags}
        onEditFlagClick={handleEditFlagClick}
        onDeleteFlagClick={handleDeleteFlagClick}
      />
    );

    expect(getByText('Reset')).toBeDisabled();

    // test toggle enabled
    await user.click(getByRole('button', { name: 'Enabled' }));
    expect(queryByText('Flag 1')).toBeInTheDocument();
    expect(queryByText('Flag 2')).not.toBeInTheDocument();

    // test reset
    await user.click(getByText('Reset'));
    expect(queryByText('Flag 1')).toBeInTheDocument();
    expect(queryByText('Flag 2')).toBeInTheDocument();

    await user.click(getByRole('button', { name: 'Disabled' }));
    expect(queryByText('Flag 1')).not.toBeInTheDocument();
    expect(queryByText('Flag 2')).toBeInTheDocument();

    const toggleFilterButton = getByTestId('FtFlagTable--enabled-filter-toggle').querySelector('input') as HTMLElement;
    await user.click(toggleFilterButton);
    expect(queryByText('Flag 1')).toBeInTheDocument();
    expect(queryByText('Flag 2')).toBeInTheDocument();
  });

  it('renders filtered flags based on module filter', async () => {
    const user = userEvent.setup();

    const { getByRole, queryByText, getByText } = render(
      <FeatureFlagTable
        featureFlags={mockFlags}
        onEditFlagClick={handleEditFlagClick}
        onDeleteFlagClick={handleDeleteFlagClick}
      />
    );

    expect(getByText('Reset')).toBeDisabled();
    const availableModules = getUniqueValuesByKey(mockFlags, 'module');
    // click on multiselect to open menu options
    await user.click(getByRole('button', { name: 'Show All' }));

    // verify the "show all" filter is an option
    const menuElem = getByRole('listbox');
    expect(within(menuElem).getByText('Show All')).toBeInTheDocument();

    // verify all available modules are filter options
    for (const module of availableModules) {
      expect(within(menuElem).getByText(module)).toBeInTheDocument();
    }

    await user.click(within(menuElem).getByText(mockFlags[0].module));
    expect(queryByText(mockFlags[0].title)).toBeInTheDocument();
    expect(queryByText(mockFlags[1].title)).not.toBeInTheDocument();

    await act(async () => {
      await user.click(getByText('Reset'));
    });
    expect(queryByText(mockFlags[0].title)).toBeInTheDocument();
    expect(queryByText(mockFlags[1].title)).toBeInTheDocument();
  });
});
