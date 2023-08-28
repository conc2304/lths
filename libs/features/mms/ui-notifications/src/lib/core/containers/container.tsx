import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';

import { NotificationProps } from '@lths/features/mms/data-access';

import { Toolbar } from './toolbar';
import { Content } from './types';
import { Wysiwyg } from './wysiwyg';
import { Colors } from '../../common';

type Props = {
  notificationData: NotificationProps;
};

const EditorContainer = ({ notificationData }: Props) => {
  const [content, setContent] = useState<Content>({
    headline: '',
    body: '',
  });

  const handleToolbarChange = (content: Content) => {
    setContent(content);
  };

  useEffect(() => {
    if (notificationData) {
      const { content, headline } = notificationData;
      setContent({
        headline,
        body: content,
      });
    }
  }, [notificationData]);

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container direction="row" alignItems="stretch" sx={{ height: '90vh' }}>
        <Grid item xs={8} sx={{ backgroundColor: Colors.preview.background }}>
          <Wysiwyg content={content} />
        </Grid>
        <Grid item xs={4} sx={{ backgroundColor: Colors.toolbar.background }}>
          <Toolbar onToolbarChange={handleToolbarChange} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditorContainer;
