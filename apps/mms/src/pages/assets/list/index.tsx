import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import { Button, Grid, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';

import {
  AssetsRequestProps,
  AssetProps,
  PreviewAssetRowProps,
  useLazyGetAssetsItemsQuery,
  useEditResourceMutation,
  useDeleteResourceMutation,
  AssetExtendedListProps,
  useUploadAssetMutation,
} from '@lths/features/mms/data-access';
import {
  cleanUrl,
  AssetSearchBar,
  TableFileInfoRow,
  AssetModals,
  PreviewDrawerContent,
  UploadConfirmDialog,
} from '@lths/features/mms/ui-components';
import { DialogForm, FileList, toast } from '@lths/shared/ui-elements';
import {
  Table,
  TablePaginationProps,
  TableSortingProps,
  PageContentWithRightDrawer,
  RowBuilderFn,
} from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

// * header keys should match the key they are associated with on the backend for sorting
// *   not be some random slugified version of label
const headers = [
  {
    id: 'original_file_name',
    label: 'File Name',
    sortable: true,
  },
  {
    id: 'created_on',
    label: 'Created',
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
    // * we use 'created_by' for api calls for sorting, but we use 'computed_created_by' from the assets response for the data to display
    id: 'created_by',
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
  console.log('Render AssetPage');
  const fileInputRef = useRef(null);
  const acceptedFileTypes = '.jpg,.jpeg,.png,.svg,.gif';
  const [assetModalState, setAssetModalState] = useState<AssetModalState>(null);
  const [selectedRow, setSelectedRow] = useState<AssetProps>(null);
  const [selectedPreviewRow, setSelectedPreviewRow] = useState<PreviewAssetRowProps>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [filesToUpload, setFilesToUpload] = useState<File[] | null>(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

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
  const [currPage, setCurrPage] = useState<number>(0);
  const [currPageSize, setCurrPageSize] = useState<number>(25);
  const [currSorting, setCurrSorting] = useState<TableSortingProps>({ order: 'desc', column: headers[1].id });
  const [search, setSearch] = useState({ queryString: '' });

  useEffect(() => {
    const currPagination = { page: currPage, pageSize: currPageSize };
    fetchData(currPagination, currSorting, search);
  }, [currPage, currPageSize, currSorting, search]);

  useEffect(() => {
    // if the previously selected preview row is not in the data set then reset it
    const prevSelectedPreviewInView = data?.data?.find((asset) => asset?._id === selectedPreviewRow?.asset?._id);
    if (!prevSelectedPreviewInView) {
      handleDrawerClose();
    }
  }, [data]);

  async function fetchData(
    pagination: TablePaginationProps,
    sorting: TableSortingProps,
    search: { queryString: string }
  ) {
    const req: AssetsRequestProps = {};
    if (pagination != null) {
      req.page = pagination.page;
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
    setCurrPage(0);
    setSearch({ queryString: value });
  };

  const RowBuilder = (): RowBuilderFn<AssetProps> => {
    return (props) => {
      const { data: asset, rowNumber, selectedRowId } = props;
      const index = rowNumber - 1;

      const handleSelectFile = () => {
        setSelectedPreviewRow({ asset, rowIndex: index });
        handleDrawerOpen();
      };

      const handlePreview = () => {
        const previewUrl = (asset.media_files.length > 0 && cleanUrl(asset.media_files[0]?.url)) || '';
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
        const previewUrl = (asset.media_files.length > 0 && cleanUrl(asset.media_files[0]?.url)) || '';
        previewUrl && window.open(previewUrl);
      };

      const handleOpenModal = (action: AssetModalState, row: AssetProps) => {
        setSelectedRow(row);
        setAssetModalState(action);
      };

      const isSelected = selectedRowId === asset._id;
      return (
        <TableFileInfoRow
          assetData={asset}
          key={asset._id}
          onSelectFile={handleSelectFile}
          onDownload={handleDownload}
          onModalClose={handleClose}
          onModalOpen={handleOpenModal}
          onPreview={handlePreview}
          isSelected={isSelected}
        />
      );
    };
  };

  const total = data?.pagination?.totalItems || 0;

  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml', 'image/gif'];

  const [uploadAsset, { isFetching: isAddingResource }] = useUploadAssetMutation();

  const handleOnFilesAdded = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    // if only 1 file then dont show modal, otherwise show confirmation modal
    if (!fileList) {
      return;
    }
    const files = Array.from(fileList);

    if (fileList.length === 1) {
      handleUpload(files);
    } else {
      setFilesToUpload(files);
      setConfirmationDialogOpen(true);
    }
    console.log('fileinput', fileInputRef.current.value);
  };

  const handleUpload = async (files: File[]) => {
    if (!files) {
      // todo handle when a file is the wrong type
      return;
    }

    const uploadFile = (file: File) => {
      return uploadAsset(file)
        .unwrap()
        .then(() => {
          handleOnChange({ page: 0, rowsPerPage: currPageSize, sortOrder: 'desc', orderBy: 'created_on' });
          toast.add(`Successfully uploaded media: ${file.name}`, { type: 'success' });
          // toast.add(`Successfully uploaded media: ${file.name}`, { type: 'success' });
          return `Successfully uploaded media: ${file.name}`;
        })
        .catch((error) => {
          return error;
          // toast.add(error.data || 'Unable to upload media. Please try again', { type: 'error' });
        });
    };

    const uploadPromises = Array.from(files).map(uploadFile);

    Promise.allSettled(uploadPromises)
      .then((results) => {
        results.forEach((result, index) => {
          console.log(result);
          if (result.status === 'fulfilled') {
            console.log(`File ${index + 1} uploaded successfully.`);
          } else {
            console.error(`File ${index + 1} failed to upload: ${result.reason}`);
          }
        });
      })
      .catch((error) => {
        console.error('Error uploading files.', error);
        toast.add(error.data || 'Unable to upload media. Please try again', { type: 'error' });
      });

    setFilesToUpload(null);
    fileInputRef.current.value = '';
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
    setAssetModalState(null);
  };

  const [deleteResource] = useDeleteResourceMutation();
  const handleDeleteRow = async () => {
    try {
      await deleteResource({ id: selectedRow._id }).unwrap();
      if (selectedRow._id === selectedPreviewRow?.asset?._id) {
        const currRow = data.data.findIndex((a) => a._id === selectedRow._id);
        let nextRow = Math.min(currRow + 1, data.data.length - 1); // Ensures it doesn't exceed the last index
        nextRow = nextRow === currRow ? nextRow - 1 : nextRow; // if its the same then choose the one before (for when its last in list)
        nextRow = Math.max(nextRow, 0); // and make sure that we dont bottom out

        const nextPreviewAsset = data?.data[nextRow];
        if (currRow < 0) {
          handleDrawerClose();
        }

        setSelectedPreviewRow({ asset: nextPreviewAsset, rowIndex: nextRow });
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
          <Box>
            <Input
              inputComponent={'input'}
              inputRef={fileInputRef}
              name="assets"
              type="file"
              id="upload-assets"
              onChange={handleOnFilesAdded}
              sx={{ display: 'none' }}
              inputProps={{
                multiple: true,
                accept: acceptedFileTypes,
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                fileInputRef.current.click();
              }}
            >
              <AddIcon /> ADD ASSET
            </Button>
          </Box>
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
        fetching={isFetching || isAddingResource}
        total={total}
        title="{0} Assets"
        headerCells={headers}
        data={data?.data}
        rowBuilder={RowBuilder()}
        page={currPage}
        rowsPerPage={currPageSize}
        selectedRowId={selectedPreviewAsset?._id ?? undefined}
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
      {filesToUpload && (
        <UploadConfirmDialog
          open={confirmationDialogOpen}
          onClose={() => {
            setConfirmationDialogOpen(false);
            setFilesToUpload(null);
            fileInputRef.current.value = '';
          }}
          onSubmit={handleUpload}
          files={filesToUpload}
        />
      )}
    </PageContentWithRightDrawer>
  );
}
