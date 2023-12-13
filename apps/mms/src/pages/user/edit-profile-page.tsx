import { Box, Card } from '@mui/material';

import { selectUserId, selectUser, useAppSelector } from '@lths/features/mms/data-access';
import { User, useUpdateUserMutation } from '@lths/shared/data-access';
import { toastQueueService } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';
import { UserForm } from '@lths/shared/ui-user-management';
const EditProfilePage = () => {
  const user = useAppSelector(selectUser);

  const userId = useAppSelector(selectUserId);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleUpdateUser = async (values: Partial<User>) => {
    const response = await updateUser({ userId, ...values }).unwrap();

    if (response.success) {
      toastQueueService.addToastToQueue('Profile successfully updated', { type: 'success' });
      return Promise.resolve();
    } else {
      // response error will be caught by the middleware
      return Promise.reject();
    }
  };

  return (
    <Box>
      <PageHeader title="Edit User Profile" sx={{ mt: '1rem', mb: '3.5rem' }} />
      <Card sx={{ maxWidth: '700px', margin: '0 auto', p: 2 }}>
        <UserForm
          user={user}
          onConfirm={handleUpdateUser}
          isSubmitting={isLoading}
          confirmText="Update"
          cancelText="Cancel"
        />
      </Card>
    </Box>
  );
};

export default EditProfilePage;
