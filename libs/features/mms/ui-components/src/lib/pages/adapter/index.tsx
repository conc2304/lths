import { ReactNode } from 'react';
import { Box } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import {
  CreatePageRequest,
  useCreatePageMutation,
  useDeletePageMutation,
  useDuplicatePageMutation,
  useUpdatePageNameMutation,
} from '@lths/features/mms/data-access';
import { PageAction } from '@lths/features/mms/ui-editor';

import { AlertProvider, useAlertActions } from '../../context';
import { DeletePageAlert, DuplicatePageAlert } from '../dialogs';
import { CreatePageModal, RenameData, RenamePageModal } from '../modals';

type Props = {
  children: ReactNode;
};

const PageAdapter = ({ children }: Props) => {
  const navigate = useNavigate();

  const { selectedAlert, alertPayload, closeAlert } = useAlertActions();

  const [createPage, { isLoading: isCreating }] = useCreatePageMutation();

  const [renamePage, { isLoading: isUpdating }] = useUpdatePageNameMutation();

  const [deletePage, { isLoading: isDeleting }] = useDeletePageMutation();

  const [duplicatePage, { isLoading: isDuplicating }] = useDuplicatePageMutation();

  const page_id = alertPayload ? alertPayload.page_id : '';
  const name = alertPayload ? alertPayload.name : '';

  const handleDeletePage = async () => {
    try {
      const response = await deletePage({ page_id }).unwrap();
      if (response.success) {
        closeAlert();
        toast.success('Page has been deleted successfully');
        if (response.data) navigate('/pages');
      } else {
        toast.error('Failed to delete the page');
      }
    } catch (error) {
      console.error('Error in deleting the page', error);
      toast.error('Failed to delete the page');
    }
  };

  const handleDuplicatePage = async () => {
    try {
      const response = await duplicatePage({ page_id }).unwrap();
      if (response.success) {
        closeAlert();
        toast.success('Page has been duplicated successfully');
        if (response.data) navigate(`/pages/editor/${response.data.page_id}`);
      } else {
        toast.error('Failed to duplicate the page');
      }
    } catch (error) {
      console.error('Error in duplicating the page', error);
      toast.error('Failed to duplicate the page');
    }
  };

  const handleCreatePage = async (data: CreatePageRequest) => {
    try {
      const response = await createPage(data).unwrap();
      if (response.success) {
        closeAlert();
        toast.success('Page has been created successfully');
        if (response.data) navigate(`/pages/editor/${response.data.page_id}`);
      } else {
        toast.error('Failed to create the page');
      }
    } catch (error) {
      console.error('Error in creating the page', error);
      toast.error('Failed to create the page');
    }
  };

  const handleRenamePage = async (data: RenameData) => {
    const requestData = {
      ...data,
      page_id,
    };
    try {
      const response = await renamePage(requestData).unwrap();
      if (response.success) {
        closeAlert();
        toast.success('Page has been renamed successfully');
      } else {
        toast.error('Failed to rename the page');
      }
    } catch (error) {
      console.error('Error in renaming the page', error);
      toast.error('Failed to rename the page');
    }
  };

  return (
    <Box>
      {children}
      <CreatePageModal
        isOpen={selectedAlert === PageAction.CREATE}
        handleClose={closeAlert}
        handleCreate={handleCreatePage}
        isLoading={isCreating}
      />
      <RenamePageModal
        isOpen={selectedAlert === PageAction.RENAME}
        handleClose={closeAlert}
        isLoading={isUpdating}
        handleRename={handleRenamePage}
        data={{ name }}
      />
      <DeletePageAlert
        isLoading={isDeleting}
        isOpen={selectedAlert === PageAction.DELETE}
        handleClose={closeAlert}
        handleDelete={handleDeletePage}
      />
      <DuplicatePageAlert
        isLoading={isDuplicating}
        isOpen={selectedAlert === PageAction.DUPLICATE}
        handleClose={closeAlert}
        handleDuplicate={handleDuplicatePage}
      />
    </Box>
  );
};

export const PageAdapterProvider = ({ children }: Props) => {
  const initialState = {
    selectedAlert: null,
    payload: null,
  };

  return (
    <AlertProvider initialState={initialState}>
      <PageAdapter>{children}</PageAdapter>
    </AlertProvider>
  );
};
