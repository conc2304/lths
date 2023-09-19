import { Box, Typography } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { ImageHeaderComponentProps } from '../../types';

const ImageHeaderComponent = (props: ImageHeaderComponentProps) => {
  const {
    data: { title, sub_title, image },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id} sx={{ margin: 0 }}>
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          paddingBottom: '100%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${image})`,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            padding: 3,
          }}
        >
          <Typography sx={{ fontSize: '32px', color: 'white', fontWeight: 500 }}>{title}</Typography>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '75%',
            padding: 3,
          }}
        >
          <Typography sx={{ fontSize: '24px', color: 'white', fontWeight: 500 }}>{sub_title}</Typography>
        </Box>
      </Box>
    </BasicContainer>
  );
};

export default ImageHeaderComponent;
