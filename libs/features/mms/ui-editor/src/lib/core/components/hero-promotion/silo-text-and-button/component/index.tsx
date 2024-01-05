import { Box, Typography, CardMedia, Stack } from '@mui/material';

import heroBackground from '../../../../../../assets/hero-bg.png';
import {
  HERO_HEIGHT,
  HERO_PADDING_TOP,
  HERO_PROMO_SILO_IMAGE_HEIGHT,
  HERO_PROMO_SILO_IMAGE_WIDTH,
} from '../../../../../common';
import colors from '../../../../../common/colors';
import { ReadOnlyButton as Button, HeroCardContainer } from '../../../../../elements';
import { SiloTextAndButtonComponentProps } from '../../../types';

const SiloTextAndButtonComponent = (props: SiloTextAndButtonComponentProps) => {
  const {
    data: { image, img_alt_text, title, description, btn_text },
    __ui_id__: id,
  } = props;
  return (
    <HeroCardContainer
      id={id}
      height={HERO_HEIGHT}
      image={heroBackground}
      sx={{ padding: 0, paddingTop: `${HERO_PADDING_TOP}px` }}
    >
      <Stack direction="column" justifyContent="center" alignItems="center">
        <CardMedia
          component="img"
          sx={{
            width: `${HERO_PROMO_SILO_IMAGE_WIDTH}px`,
            height: `${HERO_PROMO_SILO_IMAGE_HEIGHT}px`,
          }}
          image={image}
          alt={img_alt_text}
        />
        <Box sx={{ paddingBottom: 2 }}>
          <Typography
            sx={{
              fontSize: '1rem',
              color: colors.editor.text,
              fontWeight: 450,
              wordWrap: 'break-word',
              textAlign: 'center',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{ fontSize: '0.875rem', color: colors.editor.subText, wordWrap: 'break-word', textAlign: 'center' }}
          >
            {description}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          sx={{
            borderRadius: '20px',
            borderColor: colors.button.border,
            color: colors.editor.text,
            padding: '10px 20px',
          }}
        >
          <Typography sx={{ fontSize: 14 }}>{btn_text}</Typography>
        </Button>
      </Stack>
    </HeroCardContainer>
  );
};

export default SiloTextAndButtonComponent;
