import { TableCell, TableRow, TableSortLabel } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { TableSortingProps } from '../table-v2';
import { TableHeaderCellProps } from '../tables/types';

export const TableHeaderRow = ({
  cells,
  sorting,
  onSortClick,
}: {
  cells: TableHeaderCellProps[];
  sorting?: TableSortingProps;
  onSortClick: (column: string) => void;
}) => {
  return !cells ? null : (
    <TableRow>
      {cells.map((head) => (
        <TableCell
          key={head.id}
          sx={{
            fontWeight: 600,
            width: head.width,
          }}
        >
          {head.sortable ? (
            <TableSortLabel
              active={sorting?.column === head.id}
              direction={sorting?.column === head.id ? sorting.order : 'desc'}
              onClick={() => onSortClick(head.id)}
              IconComponent={KeyboardArrowDownIcon}
            >
              {head.label}
            </TableSortLabel>
          ) : (
            head.label
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};
