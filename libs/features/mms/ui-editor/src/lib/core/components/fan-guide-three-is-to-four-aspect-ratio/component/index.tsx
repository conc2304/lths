import { Box, Typography, Card, CardMedia, Button, Stack } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { FanGuideThreeIsToFourAspectRatioComponentProps } from '../../types';

const FanGuideThreeIsToFourAspectRatioComponent = (props: FanGuideThreeIsToFourAspectRatioComponentProps) => {
  const {
    default_data: { image, img_alt_text, title, description, btn_text },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id}>
      <Card
        sx={{
          background: 'linear-gradient(180deg, rgba(36, 37, 38, 0) 0%, #242526 100%)',
          color: 'white',
          width: '335px',
          padding: '32px 20px',
          borderRadius: '10px',
        }}
      >
        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={4}>
          <CardMedia component="img" sx={{ width: '100%' }} image={image} alt={img_alt_text} />
          <Stack direction="column" alignItems="center" spacing={2.5}>
            <Typography
              sx={{
                fontSize: 16,
                display: 'inline-block',
                paddingBottom: 1,
                borderBottom: '4px solid #BA9765',
                letterSpacing: '0.12em',
              }}
            >
              FAN GUIDE
            </Typography>
            <Stack direction="column" alignItems="center" spacing={1.5}>
              <Typography
                sx={{ fontSize: 28, fontWeight: 600, wordWrap: 'break-word', textAlign: 'center', lineHeight: 1.2 }}
              >
                {title}
              </Typography>
              <Typography sx={{ fontSize: 16, wordWrap: 'break-word', textAlign: 'center' }}>{description}</Typography>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            sx={{
              borderRadius: '24px',
              backgroundColor: 'white',
              color: 'black',
              padding: '12px 25px',
            }}
          >
            <Typography sx={{ fontSize: 16 }}>{btn_text}</Typography>
          </Button>
        </Stack>
      </Card>
    </BasicContainer>
  );
};

export default FanGuideThreeIsToFourAspectRatioComponent;
