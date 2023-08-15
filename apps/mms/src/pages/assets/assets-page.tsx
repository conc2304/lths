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
} from '@lths/features/mms/data-access';
import { Table, TablePaginationProps, TableSortingProps, PageContentWithRightDrawer } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

import TableFileInfoRow from './table-row';
import { PreviewDrawerContent, RenameModal, DeleteModal } from '../../components/assets';

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
    id: 'mime_type',
    label: 'Mime Type',
    sortable: true,
  },
  {
    id: 'media_type',
    label: 'Media Type',
    sortable: true,
  },
  {
    id: 'actions',
    label: '',
    sortable: false,
  },
];

export default function AssetsPage() {
  const [isRowModalOpen, setIsRowModalOpen] = useState('');
  const [selectedRow, setSelectedRow] = useState<Asset>(null);
  const [selectedPreviewRow, setSelectedPreviewRow] = useState<{ asset: Asset; rowIndex: number }>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const theme = useTheme();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleClose = () => {
    setSelectedRowIndex(null);
    setAnchorEl(null);
  };

  const [getData, { isFetching, isLoading, data }] = useLazyGetAssetsItemsQuery();
  const [currPagination, setCurrPagination] = useState<TablePaginationProps>(null);
  const [currSorting, setCurrSorting] = useState<TableSortingProps>(undefined);

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

  const onRowsPerPageChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event: any) => {
    const newPageSize = Number(event.target.value);
    setCurrPagination({
      ...currPagination,
      pageSize: newPageSize,
    });
    fetchData({ ...currPagination, pageSize: newPageSize }, currSorting);
  };

  const onSortClick = (pagination: TablePaginationProps, sorting: TableSortingProps) => {
    setCurrPagination(pagination);
    setCurrSorting(sorting);
    fetchData(pagination, sorting);
  };

  const [search, setSearch] = React.useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleOpenModal = (modalName: string, row: Asset) => {
    setSelectedRow(row);
    setIsRowModalOpen(modalName);
    handleClose();
  };

  const filteredData = React.useMemo(
    () =>
      search
        ? data?.data.filter((item) => item.original_file_name.toLowerCase().includes(search.toLowerCase()))
        : data?.data,
    [data, search]
  );

  const tableRows = filteredData?.map((row, index) => {
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
      const previewUrl = (row.media_files.length > 0 && row.media_files[0]?.url) || '';
      previewUrl && window.open(previewUrl);
      handleClose();
    };

    const handleOpenModal = (action: string, row: Asset) => {
      setSelectedRow(row);
      setIsRowModalOpen(action);
      handleClose();
    };

    const handleDownload = async (url, filename) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobURL = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobURL;
        a.download = filename || 'download';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(blobURL);
      } catch (error) {
        console.error('Error downloading the file:', error);
      }
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

  const total = data?.meta?.total;

  const [addResource] = useAddResourceMutation();

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (['image/jpeg', 'image/png'].includes(file.type)) {
        await handleAddAsset(file);
        await fetchData(null, undefined);
      } else {
        console.error('Invalid file type:', file.type);
      }
    }
  };

  const handleAddAsset = async (file) => {
    const newAsset = {
      unique_file_name: file.name,
      original_file_name: file.name,
      file_extension: file.type.split('/')[1],
      mime_type: file.type,

      media_files: [
        {
          url: URL.createObjectURL(file),
          format_label: 'source',
          file_extension: file.type.split('/')[1],
          mime_type: file.type,
          description: '',
          created_at: new Date().toISOString(),
          is_finalized: true,
        },
      ],
      created_at: new Date().toISOString(),
      media_type: 'image',
    };

    try {
      await addResource(newAsset).unwrap();
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
    } catch (error) {
      console.error('Failed to edit asset:', error);
    }
    fetchData(currPagination, currSorting);
    setIsRowModalOpen('');
  };

  const [deleteResource] = useDeleteResourceMutation();
  const handleDeleteRow = async () => {
    try {
      await deleteResource({ _id: selectedRow._id }).unwrap();
      if (selectedRow._id === selectedPreviewRow?.asset?._id) {
        const nextRow = selectedPreviewRow.rowIndex - 1;
        if (nextRow < 0) {
          handleDrawerClose();
          setSelectedPreviewRow(null);
        }
        setSelectedPreviewRow({ asset: filteredData[nextRow], rowIndex: nextRow });
      }
    } catch (error) {
      console.error('Failed to delete asset:', error);
    }
    fetchData(currPagination, currSorting);
    setIsRowModalOpen('');
  };

  return (
    <PageContentWithRightDrawer
      open={drawerOpen}
      title={selectedPreviewRow?.asset?.original_file_name}
      handleDrawerClose={handleDrawerClose}
      drawerContent={<PreviewDrawerContent data={selectedPreviewRow?.asset} openModal={handleOpenModal} />}
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
              accept=".jpg,.jpeg,.png"
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
        onRowsPerPageChange={onRowsPerPageChange}
        onSortClick={onSortClick}
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
