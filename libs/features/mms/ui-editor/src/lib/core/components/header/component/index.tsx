import React from 'react';
import { Typography } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { HeaderComponentProps } from '../../types';

const HeaderComponent = (props: HeaderComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { color = '#000000', title },
  } = props;

  return (
    <BasicContainer id={`${id}_component`}>
      <Typography sx={{ paddingBottom: 0.5, fontSize: 24, fontWeight: 600, color, wordWrap: 'break-word' }}>
        {title}
      </Typography>
    </BasicContainer>
  );
};
export default HeaderComponent;
