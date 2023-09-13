import React from 'react';
import { Stack, Typography } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { DescriptionComponentProps } from '../../types';

export default function DescriptionComponent(props: DescriptionComponentProps) {
  const {
    __ui_id__: id,
    data: { title, color, style },
  } = props;

  return (
    <BasicContainer id={id}>
      <Stack>
        <Typography sx={{ fontWeight: style, color }}>{title}</Typography>
      </Stack>
    </BasicContainer>
  );
}
