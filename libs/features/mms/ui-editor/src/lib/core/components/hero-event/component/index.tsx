import { Box, CardMedia, Typography, Grid } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import heroBackground from '../../../../../assets/hero-bg.png';
import placeholder from '../../../../../assets/placeholder_3_2.svg';
import colors from '../../../../common/colors';
import { CARD_HEIGHT, HERO_HEIGHT } from '../../../../common/constants';
import { HeroCardContainer } from '../../../../elements';
import { HeroEventComponentProps } from '../../types';

const HeroEventComponent = (props: HeroEventComponentProps) => {
  const { __ui_id__: id } = props;
  return (
    <HeroCardContainer id={id} image={heroBackground} height={HERO_HEIGHT} sx={{ paddingTop: '115px' }}>
      <CardMedia
        component="img"
        height={CARD_HEIGHT}
        image={placeholder}
        alt={'placeholder'}
        sx={{ borderRadius: 2.5 }}
      />
      <Box paddingY={'0.75rem'}>
        <Typography sx={{ color: colors.editor.text, fontWeight: 450, textAlign: 'center' }} marginTop={1.5}>
          Title
        </Typography>
        <Grid container justifyContent={'center'} alignItems={'center'} gap={0.5}>
          <Typography sx={{ color: colors.editor.subText, fontSize: '0.875rem', lineHeight: '1.25rem' }}>
            Sat, Jan 10
          </Typography>
          <FiberManualRecordIcon
            sx={{
              color: colors.editor.subText,
              width: 4,
              height: 4,
            }}
          />
          <Typography sx={{ color: colors.editor.subText, fontSize: '0.875rem', lineHeight: '1.25rem' }}>
            7:00PM
          </Typography>
        </Grid>
      </Box>
    </HeroCardContainer>
  );
};

export default HeroEventComponent;
