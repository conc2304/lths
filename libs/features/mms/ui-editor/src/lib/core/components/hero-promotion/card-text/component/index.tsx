import { Box, Typography, Card, CardMedia, Stack } from '@mui/material';

import colors from '../../../../../common/colors';
import { BasicContainer } from '../../../../../elements';
import { CardTextComponentProps } from '../../../types';

const CardTextComponent = (props: CardTextComponentProps) => {
  const {
    data: { image, img_alt_text, title, description },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id} sx={{ background: colors.hero.background }}>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={1.5} sx={{ padding: '32px 0' }}>
        <Card
          sx={{
            backgroundColor: colors.hero.cardText.background,
            width: '335px',
            height: '192px',
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
        <Box sx={{ maxWidth: '335px' }}>
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
    </BasicContainer>
  );
};

export default CardTextComponent;
