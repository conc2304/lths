import React from 'react';
import { Stack, Typography } from '@mui/material';

import { BasicContainer } from '../../../../../elements';
import { MapPathComponentProps } from '../../../types';

export default function MapPathComponent(props: MapPathComponentProps) {
  const {
    __ui_id__: id,
    data: { title, desc },
  } = props;

  return (
    <BasicContainer id={id}>
      <Stack sx={{ backgroundColor: '#f4f4f4', padding: '1rem', borderRadius: '0.2rem' }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', wordWrap: 'break-word' }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          style={{
            paddingTop: 4,
          }}
        >
          {desc}
        </Typography>
      </Stack>
    </BasicContainer>
  );
}
