import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { FtFlagTableHeaders } from './constants';
import { FtFlagRow } from './flag-row';
import { FeatureFlag } from '../../types';

describe('FtFlagRow', () => {
  const mockFlag: FeatureFlag = {
    id: 'flag1',
    module: 'module1',
    title: 'Flag 1',
    enabled: true,
    description: 'Description 1',
  };

  const handleDeleteFlagClick = jest.fn();
  const handleEditFlagClick = jest.fn();

  it('renders FtFlagRow component', () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <FtFlagRow
            flag={mockFlag}
            tableHeaders={FtFlagTableHeaders}
            handleDeleteFlagClick={handleDeleteFlagClick}
            handleEditFlagClick={handleEditFlagClick}
          />
        </tbody>
      </table>
    );

    const row = getByTestId('FtFlagTableRow--root');
    expect(row).toBeInTheDocument();
  });

  it('calls handleDeleteFlagClick on delete button click', () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <FtFlagRow
            flag={mockFlag}
            tableHeaders={FtFlagTableHeaders}
            handleDeleteFlagClick={handleDeleteFlagClick}
            handleEditFlagClick={handleEditFlagClick}
          />
        </tbody>
      </table>
    );

    const deleteButton = getByTestId('FtFlagTableRow--delete-btn');
    fireEvent.click(deleteButton);
    expect(handleDeleteFlagClick).toHaveBeenCalledWith(mockFlag);
  });

  it('calls handleEditFlagClick on edit button click', () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <FtFlagRow
            flag={mockFlag}
            tableHeaders={FtFlagTableHeaders}
            handleDeleteFlagClick={handleDeleteFlagClick}
            handleEditFlagClick={handleEditFlagClick}
          />
        </tbody>
      </table>
    );

    const editButton = getByTestId('FtFlagTableRow--edit-btn');
    fireEvent.click(editButton);
    expect(handleEditFlagClick).toHaveBeenCalledWith(mockFlag);
  });
});
