import React from 'react';
import { Box, Stack } from '@mui/material';

import placeholder from '../../../../assets/card-view.svg';
import { CardComponentProps } from '../../types';

const CardComponent: React.FC<CardComponentProps> = (props) => {
  const {
    default_data: { image, title, desc, type },
    id,
  } = props;
  const mobileWidth = 375;
  const mobileHeight = 812;

  return (
    <Box
      sx={{
        backgroundImage: `url('https://via.placeholder.com/1280x853.jpg')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: 0,
        position: 'relative',
        paddingTop: '66.64%', ///* (img-height / img-width * width) */
        /* (853 / 1280 * 100) */
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,

          // display: 'flex',
        }}
      >
        <Stack flexDirection={'row'} justifyContent={'space-between'} flex="1">
          <h1>{title}</h1>
          <h1>ssssss</h1>
        </Stack>
      </Box>
    </Box>
  );
  /* return (
   ition: 'relative', width: mobileWidth }}>
      <img src={placeholder} alt="background" />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          //height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack flexDirection={'row-reverse'}>
          <h1>{title}</h1>
        </Stack>
      </Box>
    </Box>
  );*/
};
export default CardComponent;
