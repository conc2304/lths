import React, { useEffect, useState, useRef } from 'react';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {
  AssetsRequestProps,
  AssetProps,
  PreviewAssetRowProps,
  useAddResourceMutation,
  useLazyGetAssetsItemsQuery,
  useEditResourceMutation,
  useDeleteResourceMutation,
  useAppSelector,
  AssetExtendedListProps,
} from '@lths/features/mms/data-access';
import {
  cleanUrl,
  AssetSearchBar,
  TableFileInfoRow,
  AssetModals,
  PreviewDrawerContent,
} from '@lths/features/mms/ui-components';
import { useLazyGetUserQuery } from '@lths/shared/data-access';
import {
  Table,
  TablePaginationProps,
  TableSortingProps,
  PageContentWithRightDrawer,
  RowBuilderFn,
} from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

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

type AssetModalState = 'Delete' | 'Rename' | null;

export default function AssetsPage() {
  const user = useAppSelector((state) => state.auth);
  const fileInputRef = useRef(null);
  const acceptedFileTypes = '.jpg,.jpeg,.png,.svg,.gif';
  const [assetModalState, setAssetModalState] = useState<AssetModalState>(null);
  const [selectedRow, setSelectedRow] = useState<AssetProps>(null);
  const [selectedPreviewRow, setSelectedPreviewRow] = useState<PreviewAssetRowProps>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedPreviewRow(null);
  };

  const handleClose = () => {
    setSelectedPreviewRow(null);
  };

  const [getData, { isFetching, isLoading, data }] = useLazyGetAssetsItemsQuery();
  // * mui pagination is 0 index, mok pagination is 1 index - current pagination will refer to ui and be adjusted on fetch
  const [currPage, setCurrPage] = useState<number>(0);
  const [currPageSize, setCurrPageSize] = useState<number>(25);
  const [currSorting, setCurrSorting] = useState<TableSortingProps>({ order: 'asc', column: headers[0].id });
  const [search, setSearch] = React.useState({ queryString: '' });

  useEffect(() => {
    const currPagination = { page: currPage, pageSize: currPageSize };
    fetchData(currPagination, currSorting, search);
  }, [currPage, currPageSize, currSorting, search]);

  async function fetchData(
    pagination: TablePaginationProps,
    sorting: TableSortingProps,
    search: { queryString: string }
  ) {
    const req: AssetsRequestProps = {};
    if (pagination != null) {
      // * mui pagination is 0 index, mok pagination is 1 index : + 1 to convert mui 0 index to mok 1 index
      req.page = pagination.page + 1;
      req.page_size = pagination.pageSize;
    }
    if (sorting != null) {
      req.sort_key = sorting.column;
      req.sort_order = sorting.order;
    }
    if (search != null && search.queryString !== '') {
      req.queryString = search.queryString;
    }

    getData(req);
  }

  const handleOnChange = ({ page, rowsPerPage, sortOrder, orderBy }) => {
    const sorting: TableSortingProps = { order: sortOrder, column: orderBy };
    setCurrPage(page);
    setCurrPageSize(rowsPerPage);
    setCurrSorting(sorting);
  };

  const handleOpenModal = (modalName: AssetModalState, row: AssetProps) => {
    setSelectedRow(row);
    setAssetModalState(modalName);
    handleClose();
  };

  const handleSearch = (value: string) => {
    // * mui pagination is 0 index, mok pagination is 1 index, but we use mui in app
    setCurrPage(0);
    setSearch({ queryString: value });
  };

  const RowBuilder = (): RowBuilderFn<AssetProps> => {
    return (props) => {
      const { data: row, rowNumber } = props;

      const index = rowNumber - 1;

      const handleSelectFile = () => {
        setSelectedPreviewRow({ asset: row, rowIndex: index });
        handleDrawerOpen();
      };

      if (selectedPreviewRow?.asset?._id === row._id && selectedPreviewRow?.rowIndex !== index) {
        setSelectedPreviewRow({ asset: row, rowIndex: index });
      }

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

      const handleOpenModal = (action: AssetModalState, row: AssetProps) => {
        setSelectedRow(row);
        setAssetModalState(action);
        handleClose();
      };

      return (
        <TableFileInfoRow
          assetData={row}
          key={row._id}
          onSelectFile={handleSelectFile}
          onDownload={handleDownload}
          onModalClose={handleClose}
          onModalOpen={handleOpenModal}
          onPreview={handlePreview}
        />
      );
    };
  };

  const total = data?.pagination?.totalItems || 0;

  const [addResource] = useAddResourceMutation();

  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml', 'image/gif'];

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (allowedFileTypes.includes(file.type)) {
        await handleAddAsset(file);
        const currPagination = {
          page: currPage,
          pageSize: currPageSize,
        };
        fetchData(currPagination, currSorting, search);
      } else {
        console.error('Invalid file type:', file.type);
      }
    }
    // This small change resets the file input after each upload,
    // which solves the problem of not being able to re-upload the same file after it has been deleted fixes MMS-473
    event.target.value = '';
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
      setSearch({ queryString: '' });
    } catch (error) {
      console.error('Failed to edit asset:', error);
    }
    setAssetModalState(null);
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
        setSelectedPreviewRow({ asset: data?.data[nextRow], rowIndex: nextRow });
        setSearch({ queryString: '' });
      }
    } catch (error) {
      console.error('Failed to delete asset:', error);
    }
    setAssetModalState(null);
  };

  const selectedPreviewAsset: AssetExtendedListProps =
    data?.data?.length && !!selectedPreviewRow
      ? data?.data?.find((asset) => asset._id === selectedPreviewRow.asset._id)
      : undefined;

  const cleanDrawerTitle = selectedPreviewAsset
    ? selectedPreviewAsset.original_file_name.slice(0, selectedPreviewAsset.original_file_name.lastIndexOf('.'))
    : 'Asset Preview';

  return (
    <PageContentWithRightDrawer
      open={drawerOpen}
      title={cleanDrawerTitle}
      handleDrawerClose={handleDrawerClose}
      drawerContent={<PreviewDrawerContent asset={selectedPreviewAsset} openModal={handleOpenModal} />}
    >
      <PageHeader
        title="Assets"
        rightContent={
          <div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleUpload}
              accept={acceptedFileTypes}
            />
            <Button
              variant="contained"
              onClick={() => {
                fileInputRef.current.click();
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
          <AssetSearchBar
            onSearch={handleSearch}
            search={search.queryString}
            isFocused={isFocused}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
          />
        </Grid>
      </Grid>

      <Table
        loading={isLoading}
        fetching={isFetching}
        total={total}
        title="{0} Assets"
        headerCells={headers}
        data={data?.data}
        rowBuilder={RowBuilder()}
        page={currPage}
        rowsPerPage={currPageSize}
        sortOrder={currSorting?.order ?? undefined}
        orderBy={currSorting?.column ?? undefined}
        onChange={handleOnChange}
        noDataMessage="No assets"
        sx={{
          mt: 1,
        }}
      />

      <AssetModals
        assetModalType={assetModalState}
        selectedRow={selectedRow}
        handleDeleteRow={handleDeleteRow}
        handlRenameRow={handlRenameRow}
        setModalState={setAssetModalState}
      />
    </PageContentWithRightDrawer>
  );
}
