import { Box, Typography, Card, CardMedia, Stack } from '@mui/material';

import heroBackground from '../../../../../../assets/hero-bg.png';
import { HERO_HEIGHT, HERO_PADDING_TOP, HERO_PROMO_CARD_HEIGHT, HERO_PROMO_CARD_WIDTH } from '../../../../../common';
import colors from '../../../../../common/colors';
import { HeroCardContainer } from '../../../../../elements';
import { CardTextComponentProps } from '../../../types';

const CardTextComponent = (props: CardTextComponentProps) => {
  const {
    data: { image, img_alt_text, title, description },
    __ui_id__: id,
  } = props;
  return (
    <HeroCardContainer id={id} height={HERO_HEIGHT} image={heroBackground} sx={{ paddingTop: `${HERO_PADDING_TOP}px` }}>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Card
          sx={{
            backgroundColor: colors.hero.cardText.background,
            width: HERO_PROMO_CARD_WIDTH,
            height: HERO_PROMO_CARD_HEIGHT,
            borderRadius: '10px',
            boxShadow: colors.hero.boxShadow,
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt={img_alt_text}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </Card>
        <Box sx={{ maxWidth: HERO_PROMO_CARD_WIDTH, paddingY: 1.5 }}>
          <Typography
            sx={{
              fontSize: '16px',
              color: colors.editor.text,
              textAlign: 'center',
              wordWrap: 'break-word',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              color: colors.editor.subText,
              textAlign: 'center',
              wordWrap: 'break-word',
            }}
          >
            {description}
          </Typography>
        </Box>
      </Stack>
    </HeroCardContainer>
  );
};

export default CardTextComponent;
