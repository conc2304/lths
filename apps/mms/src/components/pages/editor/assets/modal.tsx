import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { AssetSearchBar } from '@lths/features/mms/ui-components';
import { Table } from '@lths/shared/ui-elements';

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


  const tableRows = data?.map((row) => <TableFileInfoRow key={row.id} row={row} onSelect={onSelect} />);

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
          <Table
            loading={isLoading}
            fetching={isFetching}
            total={total}
            title="{0} Assets"
            headerCells={headers}
            tableRows={tableRows}
            pagination={pagination}
            sorting={sorting}
            onPageChange={onPageChange}
            noDataMessage="No assets"
            sx={{
              mt: 1,
            }}
            fixPagination={true}
          />
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AssetsModal;
