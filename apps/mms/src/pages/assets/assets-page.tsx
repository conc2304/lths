import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

import {
  AssetsRequest,
  Asset,
  useAddResourceMutation,
  useLazyGetAssetsItemsQuery,
  useEditResourceMutation,
  useDeleteResourceMutation,
  useAppSelector,
  useLazySearchAssetsQuery,
} from '@lths/features/mms/data-access';
import { useLazyGetUserQuery } from '@lths/shared/data-access';
import { Table, TablePaginationProps, TableSortingProps, PageContentWithRightDrawer } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

import TableFileInfoRow from './table-row';
import { PreviewDrawerContent, RenameModal, DeleteModal } from '../../components/assets';
import { cleanUrl } from '../../components/assets/utils';

const headers = [
  {
    id: 'unique_file_name',
    label: 'File Name',
    sortable: true,
  },
  {
    id: 'created_at',
    label: 'Created At',
    sortable: true,
  },
  {
    id: 'file_extension',
    label: 'File Extension',
    sortable: true,
  },
  {
    id: 'file_type',
    label: 'File Type',
    sortable: true,
  },
  {
    id: 'owner',
    label: 'Owner',
    sortable: true,
  },
  {
    id: 'actions',
    label: '',
    sortable: false,
  },
];

export default function AssetsPage() {
  const user = useAppSelector((state) => state.auth);
  const acceptedFileTypes = '.jpg,.jpeg,.png,.svg';
  const [isRowModalOpen, setIsRowModalOpen] = useState('');
  const [selectedRow, setSelectedRow] = useState<Asset>(null);
  const [selectedPreviewRow, setSelectedPreviewRow] = useState<{ asset: Asset; rowIndex: number }>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const theme = useTheme();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedPreviewRow(null);
  };

  const handleClose = () => {
    setSelectedRowIndex(null);
    setAnchorEl(null);
  };

  const [getData, { isFetching, isLoading, data }] = useLazyGetAssetsItemsQuery();
  const [currPagination, setCurrPagination] = useState<TablePaginationProps>(null);
  const [currSorting, setCurrSorting] = useState<TableSortingProps>(undefined);
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  async function fetchData(pagination: TablePaginationProps, sorting: TableSortingProps, search = '') {
    const req: AssetsRequest = {};
    if (pagination != null) {
      req.page = pagination.page;
      req.page_size = pagination.pageSize;
    }
    if (sorting != null) {
      req.sort_key = sorting.column;
      req.sort_order = sorting.order;
    }
    if (search !== '') {
      req.search = search;
    }

    getData(req);
  }

  useEffect(() => {
    fetchData(null, undefined);
  }, []);

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => {
    setCurrPagination(pagination);
    setCurrSorting(sorting);
    fetchData(pagination, sorting);
  };

  const handleOpenModal = (modalName: string, row: Asset) => {
    setSelectedRow(row);
    setIsRowModalOpen(modalName);
    handleClose();
  };

  const [search, setSearch] = React.useState('');

  const [triggerSearch, { data: searchResult }] = useLazySearchAssetsQuery();
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search !== '') {
      const searchParams = {
        queryString: search,
        page: 0,
        page_size: localData?.meta?.total,
      };
      triggerSearch(searchParams);
    } else {
      fetchData(null, undefined);
    }
  }, [search, triggerSearch]);

  useEffect(() => {
    if (searchResult) {
      setLocalData(searchResult);
    }
  }, [searchResult]);

  const tableRows = localData?.data?.map((row, index) => {
    const handleSelectFile = () => {
      setSelectedPreviewRow({ asset: row, rowIndex: index });
      handleDrawerOpen();
    };

    if (selectedPreviewRow?.asset?._id === row._id && selectedPreviewRow?.rowIndex !== index) {
      setSelectedPreviewRow({ asset: row, rowIndex: index });
    }

    const handleOpenMenu = (event) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
      setSelectedRowIndex(index);
    };

    const handlePreview = () => {
      const previewUrl = (row.media_files.length > 0 && cleanUrl(row.media_files[0]?.url)) || '';
      if (previewUrl) {
        const imageWindow = window.open(previewUrl);
        imageWindow.document.write('<html><head><title>Preview</title></head><body>');
        imageWindow.document.write(
          '<img src="' + previewUrl + '" alt="Image Preview" style="max-width:100%; height:auto;">'
        );
        imageWindow.document.write('</body></html>');
        imageWindow.document.close();
      }
    };

    const handleDownload = () => {
      const previewUrl = (row.media_files.length > 0 && cleanUrl(row.media_files[0]?.url)) || '';
      previewUrl && window.open(previewUrl);
      handleClose();
    };

    const handleOpenModal = (action: string, row: Asset) => {
      setSelectedRow(row);
      setIsRowModalOpen(action);
      handleClose();
    };

    return (
      <TableFileInfoRow
        row={row}
        index={index}
        key={row._id}
        handleSelectFile={handleSelectFile}
        handleOpenMenu={handleOpenMenu}
        selectedPreviewRow={selectedPreviewRow}
        theme={theme}
        selectedRowIndex={selectedRowIndex}
        anchorEl={anchorEl}
        handleDownload={handleDownload}
        handleClose={handleClose}
        handleOpenModal={handleOpenModal}
        handlePreview={handlePreview}
      />
    );
  });

  const total = localData?.meta?.total || 0;

  const [addResource] = useAddResourceMutation();

  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (allowedFileTypes.includes(file.type)) {
        await handleAddAsset(file);
        fetchData(currPagination, currSorting);
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

  const [editResource] = useEditResourceMutation();

  const handlRenameRow = async (newName: string) => {
    try {
      await editResource({ id: selectedRow._id, original_file_name: newName }).unwrap();

      if (selectedPreviewRow) {
        setSelectedPreviewRow({
          asset: {
            ...selectedPreviewRow.asset,
            original_file_name: newName,
          },
          rowIndex: null,
        });
      }
      setSearch('');
    } catch (error) {
      console.error('Failed to edit asset:', error);
    }
    fetchData(currPagination, currSorting);
    setIsRowModalOpen('');
  };

  const [deleteResource] = useDeleteResourceMutation();
  const handleDeleteRow = async () => {
    try {
      await deleteResource({ id: selectedRow._id }).unwrap();
      if (selectedRow._id === selectedPreviewRow?.asset?._id) {
        const nextRow = selectedPreviewRow.rowIndex - 1;
        if (nextRow < 0) {
          handleDrawerClose();
        }
        setSelectedPreviewRow({ asset: localData?.data[nextRow], rowIndex: nextRow });
        setSearch('');
      }
    } catch (error) {
      console.error('Failed to delete asset:', error);
    }
    fetchData(currPagination, currSorting);
    setIsRowModalOpen('');
  };

  const cleanDrawerTitle = localData?.data[selectedPreviewRow?.rowIndex]?.original_file_name.slice(
    0,
    localData?.data[selectedPreviewRow?.rowIndex]?.original_file_name.lastIndexOf('.')
  );

  return (
    <PageContentWithRightDrawer
      open={drawerOpen}
      title={cleanDrawerTitle}
      handleDrawerClose={handleDrawerClose}
      drawerContent={
        <PreviewDrawerContent data={localData?.data[selectedPreviewRow?.rowIndex]} openModal={handleOpenModal} />
      }
    >
      <PageHeader
        title="Assets"
        rightContent={
          <div>
            <input
              type="file"
              id="file-upload"
              style={{ display: 'none' }}
              onChange={handleUpload}
              accept={acceptedFileTypes}
            />
            <Button
              variant="contained"
              onClick={() => {
                document.getElementById('file-upload').click();
              }}
            >
              <AddIcon /> ADD ASSET
            </Button>
          </div>
        }
        sx={{ mt: 2 }}
      />
      <Grid container spacing={2} marginTop={'1vw'}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            onChange={handleSearchChange}
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
      </Grid>
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
      />

      {isRowModalOpen === 'Delete' && (
        <DeleteModal
          open={true}
          itemToDelete={selectedRow?.original_file_name}
          onClickKeepButton={() => setIsRowModalOpen('')}
          onClickDeleteButton={handleDeleteRow}
        />
      )}
      {isRowModalOpen === 'Rename' && (
        <RenameModal
          open={true}
          itemToRename={selectedRow?.original_file_name}
          onClickCancelButton={() => setIsRowModalOpen('')}
          onClickOkButton={handlRenameRow}
        />
      )}
    </PageContentWithRightDrawer>
  );
}
