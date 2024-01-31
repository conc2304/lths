import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { TableTitleRow } from './table-title-row';

describe('TableTitleRow', () => {
  it('renders title with total and export button when not loading', () => {
    const onExportClick = jest.fn();
    const totalRows = 99;

    const { getByText, getByRole } = render(
      <TableTitleRow title="{0} Datas" total={totalRows} loading={false} onExportClick={onExportClick} />
    );

    expect(getByText(`${totalRows} Datas`)).toBeInTheDocument();
    expect(getByRole('button', { name: 'EXPORT' })).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: 'EXPORT' }));
    expect(onExportClick).toHaveBeenCalledTimes(1);
  });

  it('renders loading skeleton when loading is true', () => {
    const { getByTestId } = render(<TableTitleRow loading={true} />);

    expect(getByTestId('Table-V2--title-skeleton')).toBeInTheDocument();
  });

  it('renders title without total when total is not provided', () => {
    const { getByText } = render(<TableTitleRow title="Table Title" loading={false} />);

    expect(getByText('Table Title')).toBeInTheDocument();
  });

  it('renders title without export button when onExportClick is not provided', () => {
    const { queryByRole } = render(<TableTitleRow title="Table Title" total={100} loading={false} />);

    expect(queryByRole('button')).toBeNull();
  });
});
