import React from 'react';
import { Typography, Stack, Divider } from '@mui/material';

import { SEGMENT_WIDTH, VALUE } from '../../../../../common';
import colors from '../../../../../common/colors';

export type SegmentelementProps = {
  title: string;
  description: string;
  index: number;
};

const SegmentComponent = (props: SegmentelementProps) => {
  const { title, description, index } = props;
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      display={'flex'}
      sx={{ width: SEGMENT_WIDTH, flex: '0 0 auto' }}
    >
      <Typography
        variant="h5"
        sx={{
          paddingX: '1rem',
          fontSize: '0.875rem',
          color: index === VALUE ? colors.editor.text : colors.editor.subText,
        }}
      >
        {title}
      </Typography>
      <Typography
        gutterBottom
        variant="body2"
        component="div"
        sx={{
          paddingX: '1rem',
          fontSize: '0.75rem',
          color: index === VALUE ? colors.editor.text : colors.editor.subText,
        }}
      >
        {description}
      </Typography>
      {index === 0 && (
        <Divider
          color={colors.editor.divider}
          sx={{
            height: '3px',
            flexShrink: 0,
            alignSelf: 'stretch',
            borderRadius: '100px 200px 0px 0px',
          }}
        />
      )}
    </Stack>
  );
};

export default SegmentComponent;
