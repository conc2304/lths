import { Box, Typography, Card, CardMedia, Stack } from '@mui/material';

import heroBackground from '../../../../../../assets/hero-bg.png';
import { HERO_HEIGHT, HERO_PADDING_TOP, HERO_PROMO_CARD_HEIGHT, HERO_PROMO_CARD_WIDTH } from '../../../../../common';
import colors from '../../../../../common/colors';
import { ReadOnlyButton as Button, HeroCardContainer } from '../../../../../elements';
import { CardTextOverlayAndButtonComponentProps } from '../../../types';

const CardTextOverlayAndButtonComponent = (props: CardTextOverlayAndButtonComponentProps) => {
  const {
    data: { image, img_alt_text, title, description, btn_text },
    __ui_id__: id,
  } = props;
  return (
    <HeroCardContainer id={id} height={HERO_HEIGHT} image={heroBackground} sx={{ paddingTop: `${HERO_PADDING_TOP}px` }}>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Card
          sx={{
            backgroundColor: 'black',
            color: 'white',
            width: HERO_PROMO_CARD_WIDTH,
            height: HERO_PROMO_CARD_HEIGHT,
            padding: '0 20px',
            borderRadius: '10px',
            boxShadow: colors.hero.boxShadow,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }} spacing={2}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontSize: '20px', fontWeight: 450, wordWrap: 'break-word' }}>{title}</Typography>
              <Typography sx={{ fontSize: '14px', color: colors.editor.subText, wordWrap: 'break-word' }}>
                {description}
              </Typography>
            </Box>
            <CardMedia component="img" sx={{ width: '150px' }} image={image} alt={img_alt_text} />
          </Stack>
        </Card>
        <Button
          variant="outlined"
          sx={{
            borderRadius: '20px',
            borderColor: colors.button.border,
            color: 'white',
            padding: '10px 20px',
            marginY: 1.5,
          }}
        >
          <Typography sx={{ fontSize: 14 }}>{btn_text}</Typography>
        </Button>
      </Stack>
    </HeroCardContainer>
  );
};

export default CardTextOverlayAndButtonComponent;
