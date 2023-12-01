import React from 'react';
import { CardMedia } from '@mui/material';

import { HORIZONTAL_SMALL_ASPECT_RATIO, MOBILE_SCREEN_WIDTH } from '../../../../common/constants';
import { BasicContainer } from '../../../../elements';
import { HorizontalSmallComponentProps } from '../../types';

const HorizontalSmallComponent = (props: HorizontalSmallComponentProps) => {
  const {
    __ui_id__: id,
    data: { file },
  } = props;
  return (
    <BasicContainer id={id} sx={{ marginX: 0 }}>
      <CardMedia
        component="img"
        image={file}
        alt="img_alt_txt"
        height={MOBILE_SCREEN_WIDTH / HORIZONTAL_SMALL_ASPECT_RATIO}
      />
    </BasicContainer>
  );
};

export default HorizontalSmallComponent;
