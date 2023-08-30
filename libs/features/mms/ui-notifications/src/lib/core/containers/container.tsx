import { Box, Grid } from '@mui/material';

import { NotificationProps, UpdateNotificationRequestProps } from '@lths/features/mms/data-access';

import { Toolbar } from './toolbar';
import { UpdateEditorStateProps } from './types';
import { Wysiwyg } from './wysiwyg';
import { Colors } from '../../common';

type Props = {
  notificationData: NotificationProps;
  onUpdateNotification: (data: UpdateNotificationRequestProps) => void;
  updateEditorState: UpdateEditorStateProps;
};

const EditorContainer = ({ notificationData, onUpdateNotification, updateEditorState }: Props) => {
  const { headline, content } = notificationData || {};

  const previewData = {
    headline,
    content,
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container direction="row" alignItems="stretch" sx={{ height: '90vh' }}>
        <Grid item xs={8} sx={{ backgroundColor: Colors.preview.background }}>
          <Wysiwyg content={previewData} />
        </Grid>
        <Grid item xs={4} sx={{ backgroundColor: Colors.toolbar.background }}>
          <Toolbar
            notificationData={notificationData}
            onUpdateNotification={onUpdateNotification}
            updateEditorState={updateEditorState}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditorContainer;
