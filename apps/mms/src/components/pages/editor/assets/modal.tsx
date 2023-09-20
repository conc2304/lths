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
import { useLazyGetUserQuery } from '@lths/shared/data-access';
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
  onPageChange,
  onFetch,
  search,
  onSearch,
}: AssetModalProps) => {
  const user = useAppSelector((state) => state.auth);
  const theme = useTheme();
  const [addResource] = useAddResourceMutation();

  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleAssetSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];

  const handleAssetsUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (allowedFileTypes.includes(file.type)) {
        await handleAddAsset(file);
        await onFetch(null, undefined);
      } else {
        console.error('Invalid file type:', file.type);
      }
    }
  };

  const [getUser] = useLazyGetUserQuery();

  const handleAddAsset = async (file) => {
    const newAsset = file;

    try {
      const owner = await getUser(user.userId);
      await addResource({ newAsset, user: owner?.data?.data?.username }).unwrap();
    } catch (error) {
      console.error('Failed to add asset:', error);
    }
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
            <TextField
              fullWidth
              onChange={handleAssetSearch}
              value={search}
              label="Search"
              variant="outlined"
              onFocus={handleFocus}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: isFocused,
                style: isFocused
                  ? {
                      marginLeft: '10px',
                      backgroundColor: '#fff',
                      paddingRight: '10px',
                    }
                  : { marginLeft: '30px', backgroundColor: '#fff', paddingRight: '10px' },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
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
