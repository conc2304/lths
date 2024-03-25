import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
  CreatePageRequest,
  useCreatePageMutation,
  useDeletePageMutation,
  useDuplicatePageMutation,
  useUpdatePageNameMutation,
} from '@lths/features/mms/data-access';
import { PageAction } from '@lths/features/mms/ui-editor';
import { toast } from '@lths/shared/ui-elements';

import { AlertProvider, useAlertActions } from '../../context';
import { DeletePageAlert, ComparisonAlert, DuplicatePageAlert } from '../dialogs';
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

  const default_page_id = alertPayload ? alertPayload.default_page_id : '';
  const page_id = alertPayload ? alertPayload.page_id : '';
  const name = alertPayload ? alertPayload.name : '';

  const handleDeletePage = async () => {
    try {
      const response = await deletePage({ page_id }).unwrap();
      if (response.success) {
        closeAlert();
        toast.add('Page has been deleted successfully', { type: 'success' });
        if (response.data) navigate('/pages');
      } else {
        toast.add('Failed to delete the page', { type: 'error' });
      }
    } catch (error) {
      console.error('Error in deleting the page', error);
      toast.add('Failed to delete the page', { type: 'error' });
    }
  };

  const handleDuplicatePage = async () => {
    try {
      const response = await duplicatePage({ page_id }).unwrap();
      if (response.success) {
        closeAlert();
        toast.add('Page has been duplicated successfully', { type: 'success' });
        if (response.data) navigate(`/pages/editor/${response.data.page_id}`);
      } else {
        toast.add('Failed to duplicate the page', { type: 'error' });
      }
    } catch (error) {
      console.error('Error in duplicating the page', error);
      toast.add('Failed to duplicate the page', { type: 'error' });
    }
  };

  const handleCreatePage = async (data: CreatePageRequest) => {
    try {
      const response = await createPage(data).unwrap();
      if (response.success) {
        closeAlert();
        toast.add('Page has been created successfully', { type: 'success' });
        if (response.data) navigate(`/pages/editor/${response.data.page_id}`);
      } else {
        toast.add('Failed to create the page', { type: 'error' });
      }
    } catch (error) {
      console.error('Error in creating the page', error);
      toast.add('Failed to create the page', { type: 'error' });
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
        toast.add('Page has been renamed successfully', { type: 'success' });
      } else {
        toast.add('Failed to rename the page', { type: 'error' });
      }
    } catch (error) {
      console.error('Error in renaming the page', error);
      toast.add('Failed to rename the page', { type: 'error' });
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
        description={name}
      />
      <DuplicatePageAlert
        isLoading={isDuplicating}
        isOpen={selectedAlert === PageAction.DUPLICATE}
        handleClose={closeAlert}
        handleDuplicate={handleDuplicatePage}
        description={name}
      />
      <ComparisonAlert
        isOpen={selectedAlert === PageAction.COMPARISON}
        handleClose={closeAlert}
        page_id={page_id}
        default_page_id={default_page_id}
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
