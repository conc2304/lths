import { Box } from '@mui/material';

import NotificationHeader from '../../components/notifications/editor/header';

const NotificationEditor = () => {
  return (
    <Box>
      <NotificationHeader
        title="Notification name"
        status="SENT"
        onStatusChange={() => console.log('handling status change')}
      />
    </Box>
  );
};

export default NotificationEditor;
