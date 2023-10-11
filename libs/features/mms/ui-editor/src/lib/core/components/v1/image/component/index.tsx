import { Box } from '@mui/material';

import { BasicContainer } from '../../../../../elements';
import { ImageComponentProps } from '../../../types';

const ImageComponent = (props: ImageComponentProps) => {
  const {
    data: { image },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id} sx={{ marginX: 0 }}>
      <Box
        sx={{
          width: '100%',
          height: '427px',
          paddingBottom: '100%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${image})`,
        }}
      ></Box>
    </BasicContainer>
  );
};

export default ImageComponent;
