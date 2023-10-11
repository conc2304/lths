import { Box, Typography } from '@mui/material';

import { HeroContainer } from '../../../../../elements';
import { CardImageComponentProps } from '../../../types';

const CardImageComponent = (props: CardImageComponentProps) => {
  const {
    data: { title, image },
    __ui_id__: id,
  } = props;
  return (
    <HeroContainer id={id} width={335} height={245} image={image}>
      <Box sx={{ alignSelf: ' flex-end' }}>
        <Typography
          sx={{ paddingBottom: 0.5, fontSize: 20, fontWeight: 600, color: '#ffffff', wordWrap: 'break-word' }}
        >
          {title}
        </Typography>
      </Box>
    </HeroContainer>
  );
};

export default CardImageComponent;
