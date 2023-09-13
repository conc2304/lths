import { Box, Grid } from '@mui/material';

import { NotificationDataProps } from '@lths/features/mms/data-access';

import { Toolbar } from './toolbar';
import { UpdateEditorStateProps } from './types';
import { Wysiwyg } from './wysiwyg';
import { Colors } from '../../common';

type Props = {
  notificationData: NotificationDataProps;
  onUpdateNotification: (data: NotificationDataProps) => void;
  updateEditorState: UpdateEditorStateProps;
  isUpdating: boolean;
};

const EditorContainer = ({ notificationData, onUpdateNotification, updateEditorState, isUpdating }: Props) => {
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
            isUpdating={isUpdating}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditorContainer;
