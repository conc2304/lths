import { Box, Typography } from '@mui/material';

import { HeroContainer } from '../../../../elements';
import { ImageComponentProps } from '../../types';

const ImageComponent = (props: ImageComponentProps) => {
  const {
    properties_data: { image, title, desc, color = '#000000' },
    __ui_id__: id,
  } = props;
  return (
    <HeroContainer id={id} width={335} height={245} image={image}>
      <Box sx={{ alignSelf: ' flex-end' }}>
        <Typography sx={{ paddingBottom: 0.5, fontSize: 20, fontWeight: 600, color, wordWrap: 'break-word' }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 10, color, wordWrap: 'break-word' }}>{desc}</Typography>
      </Box>
    </HeroContainer>
  );
};

export default ImageComponent;
