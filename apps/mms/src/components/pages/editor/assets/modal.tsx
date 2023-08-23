import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import { useAddResourceMutation, useAppSelector } from '@lths/features/mms/data-access';
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
    id: 'dimensions',
    label: 'Dimensions',
    sortable: true,
  },
];

const AssetsModal = ({
  open,
  onClose,
  onSelect,
  assetData = [],
  isFetching,
  isLoading,
  total,
  onPageChange,
  onRowsPerPageChange,
  onSortClick,
  fetchData,
}: AssetModalProps) => {
  const user = useAppSelector((state) => state.users.user);
  const theme = useTheme();
  const [addResource] = useAddResourceMutation();

  const [search, setSearch] = React.useState('');

  const handleAssetSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  const handleAssetsUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (allowedFileTypes.includes(file.type)) {
        await handleAddAsset(file);
        await fetchData(null, undefined);
      } else {
        console.error('Invalid file type:', file.type);
      }
    }
  };

  const handleAddAsset = async (file) => {
    const newAsset = file;

    try {
      await addResource({ newAsset, user }).unwrap();
    } catch (error) {
      console.error('Failed to add asset:', error);
    }
  };

  const filteredData = React.useMemo(
    () =>
      search
        ? assetData?.filter((item) => item.original_file_name.toLowerCase().includes(search.toLowerCase()))
        : assetData,
    [assetData, search]
  );

  const tableRows = filteredData?.map((row) => <TableFileInfoRow key={row.id} row={row} onSelect={onSelect} />);

  React.useEffect(() => {
    if (open) {
      setSearch('');
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
            <TextField
              fullWidth
              label="Search"
              onChange={handleAssetSearch}
              value={search}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>

          <Grid item xs={2} justifyContent="flex-end" display="flex">
            <input
              type="file"
              id="assets-modal-file-upload"
              style={{ display: 'none' }}
              onChange={handleAssetsUpload}
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
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            onSortClick={onSortClick}
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
