import { ReactNode } from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { Delete, Edit, Visibility, VisibilityOff } from '@mui/icons-material';

import { TableColumnHeader } from '@lths/shared/ui-elements';

import { FeatureFlag } from '../../types';

type FtFlagRowProps = {
  flag: FeatureFlag;
  tableHeaders: TableColumnHeader[];
  handleDeleteFlagClick: (flag: FeatureFlag) => void;
  handleEditFlagClick: (flag: FeatureFlag) => void;
};

export const FtFlagRow = (props: FtFlagRowProps) => {
  const { flag: data, tableHeaders, handleDeleteFlagClick, handleEditFlagClick } = props;

  return (
    <TableRow data-testid="FtFlagTableRow--root">
      <>
        {tableHeaders.map((col) => {
          const key = col.id as keyof FeatureFlag;
          const cellValue = data[key];

          if (col.id === 'edit') {
            return (
              <TableCell key={col.id} size="small" align={col.align} width={col.width}>
                <IconButton data-testid="FtFlagTableRow--edit-btn" onClick={() => handleEditFlagClick(data)}>
                  <Edit />
                </IconButton>
              </TableCell>
            );
          }

          if (col.id === 'delete') {
            return (
              <TableCell key={col.id} size="small" align={col.align} width={col.width}>
                <IconButton data-testid="FtFlagTableRow--delete-btn" onClick={() => handleDeleteFlagClick(data)}>
                  <Delete />
                </IconButton>
              </TableCell>
            );
          }

          let content: ReactNode;

          if (typeof cellValue === 'boolean') {
            content = cellValue ? (
              <Visibility fontSize="medium" htmlColor="#388E3C" />
            ) : (
              <VisibilityOff fontSize="medium" color="disabled" />
            );
          } else {
            content = cellValue;
          }

          return (
            <TableCell
              key={key}
              size={key === 'enabled' ? 'small' : undefined}
              align={col.align}
              sx={{
                pl: col.align === 'center' && col.sortable ? '-18px' : undefined,
              }}
            >
              {content}
            </TableCell>
          );
        })}
      </>
    </TableRow>
  );
};
