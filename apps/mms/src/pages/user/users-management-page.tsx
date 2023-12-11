import { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

import { PageHeader } from '@lths/shared/ui-layouts';

const UserManagementPage = () => {
  const init = async () => {
    console.log('fetch users');
  };
  useEffect(() => {
    init();
  });

  const headerActions = (
    <Box>
      <Button variant="contained" color="primary" startIcon={<PersonAdd />}>
        Add User
      </Button>
    </Box>
  );

  return (
    <Box
      data-testid="MMS-User-Management-Page--root"
      style={{
        width: '-webkit-fill-available',
      }}
    >
      <PageHeader title="Manage Users" sx={{ mt: '1rem', mb: '3.5rem' }} rightContent={headerActions} />
    </Box>
  );
};

export default UserManagementPage;
