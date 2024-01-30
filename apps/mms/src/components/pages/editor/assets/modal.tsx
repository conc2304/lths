import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { AssetProps } from '@lths/features/mms/data-access';
import { AssetSearchBar } from '@lths/features/mms/ui-components';
import { TableSortingProps, TablePaginationProps, TableV2, RowBuilderFn } from '@lths/shared/ui-elements';

import { TableFileInfoRow } from './table-row';
import { AssetModalProps } from './types';

const headers = [
  {
    id: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    id: 'created',
    label: 'Created',
    sortable: true,
  },
  {
    id: 'file_extension',
    label: 'File Extension',
    sortable: true,
  },
  {
    id: 'filetype',
    label: 'File Type',
    sortable: true,
  },
  {
    id: 'owner',
    label: 'Owner',
    sortable: true,
  },
  {
    id: 'asset_actions',
    label: '',
    sortable: false,
  },
];

const AssetsModal = ({
  open,
  onClose,
  onSelect,
  data = [],
  isFetching,
  isLoading,
  total,
  pagination,
  sorting,
  onPageChange,
  onUpload,
  search,
  onSearch,
}: AssetModalProps) => {
  const theme = useTheme();

  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = (value: string) => {
    onSearch(value);
  };

  const RowBuilder = (): RowBuilderFn<AssetProps> => {
    return ({ data }) => {
      return <TableFileInfoRow key={data.id} row={data} onSelect={onSelect} />;
    };
  };

  const handleOnChange = ({ page, rowsPerPage, sortOrder, orderBy }) => {
    const pagination: TablePaginationProps = {
      page,
      pageSize: rowsPerPage,
    };

    const sorting: TableSortingProps = {
      order: sortOrder,
      column: orderBy,
    };

    onPageChange({} as React.MouseEvent<HTMLButtonElement, MouseEvent>, pagination, sorting);
  };

  React.useEffect(() => {
    if (open) {
      onSearch('');
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle>
        <Typography sx={{ fontSize: '1.5rem' }}>Assets</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: () => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Grid container flexWrap="nowrap" marginTop={'1vw'} justifyContent="space-evenly" sx={{ padding: 1 }}>
          <Grid item xs={10}>
            <AssetSearchBar
              onSearch={handleSearch}
              search={search}
              isFocused={isFocused}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={2} justifyContent="flex-end" display="flex">
            <input
              type="file"
              id="assets-modal-file-upload"
              style={{ display: 'none' }}
              onChange={onUpload}
              accept=".jpg,.jpeg,.png"
            />
            <Button
              variant="contained"
              onClick={() => {
                const fileInput = document.getElementById('assets-modal-file-upload') as HTMLInputElement | null;
                if (fileInput) {
                  fileInput.click();
                }
              }}
            >
              <AddIcon /> ADD ASSET
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent sx={{ height: '40rem' }}>
        <Grid item xs={9} sx={{ padding: 1 }}>
          <TableV2
            loading={isLoading}
            fetching={isFetching}
            data={data}
            total={total}
            title="{0} Assets"
            headerCells={headers}
            onChange={handleOnChange}
            noDataMessage="No assets"
            page={pagination?.page ?? undefined}
            rowsPerPage={pagination?.pageSize ?? undefined}
            sortOrder={sorting?.order ?? undefined}
            orderBy={sorting?.column ?? undefined}
            rowBuilder={RowBuilder()}
            sx={{ mt: 1 }}
          />
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AssetsModal;
