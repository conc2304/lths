import { Box, Typography } from '@mui/material';

import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import { ImageHeaderComponentProps } from '../../types';

const ImageHeaderComponent = (props: ImageHeaderComponentProps) => {
  const {
    data: { title, sub_title, image },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id} sx={{ marginX: 0 }}>
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
        <Typography
          sx={{
            position: 'absolute',
            top: '10%',
            padding: 3,
            fontSize: '32px',
            color: colors.editor.text,
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            position: 'absolute',
            top: '75%',
            padding: 3,
            fontSize: '24px',
            color: colors.editor.text,
            fontWeight: 500,
          }}
        >
          {sub_title}
        </Typography>
      </Box>
    </BasicContainer>
  );
};

export default ImageHeaderComponent;
