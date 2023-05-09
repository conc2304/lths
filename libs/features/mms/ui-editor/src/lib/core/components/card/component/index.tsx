import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import placeholder from '../../../../assets/card-view.svg';
import { CardComponentProps } from '../../types';

const CardComponent: React.FC<CardComponentProps> = (props) => {
  const {
    default_data: { image, title, desc, type },
    __ui_id__: id,
  } = props;
  const mobileWidth = 375;
  const mobileHeight = 812;
  const perc = (245 / 335) * 100;
  return (
    <Box
      sx={{
        //backgroundImage: `url('https://via.placeholder.com/1280x853.jpg')`,
        backgroundImage: `url(${require('../../../../assets/card-view.png')})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        // width: '100%',
        height: 0,
        position: 'relative',
        paddingTop: `${perc}%`,
        //paddingTop: '66.64%', ///* (img-height / img-width * width) *//* (853 / 1280 * 100) */
      }}
    >
      <Box
        id={`${id}_component`}
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,

          display: 'flex',
        }}
      >
        <Box sx={{ alignSelf: ' flex-end', margin: 2 }}>
          <Typography
            sx={{ paddingBottom: 0.5, fontSize: 20, fontWeight: 600, color: '#ffffff', wordWrap: 'break-word' }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontSize: 10, color: '#ffffff', wordWrap: 'break-word' }}>{desc}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default CardComponent;
