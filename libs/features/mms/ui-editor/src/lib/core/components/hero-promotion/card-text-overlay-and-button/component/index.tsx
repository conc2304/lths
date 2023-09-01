import { Box, Typography, Card, CardMedia, Button, Stack } from '@mui/material';

import { BasicContainer } from '../../../../../elements';
import { CardTextOverlayAndButtonComponentProps } from '../../../types';

const CardTextOverlayAndButtonComponent = (props: CardTextOverlayAndButtonComponentProps) => {
  const {
    default_data: { image, img_alt_text, title, description, btn_text },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id} sx={{ background: 'linear-gradient(180deg, #888888, #000000)' }}>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ padding: '32px 0' }}>
        <Card
          sx={{
            backgroundColor: 'black',
            color: 'white',
            width: '335px',
            height: '192px',
            padding: '0 20px',
            borderRadius: '10px',
            boxShadow: '0px 16px 24px -4px #0000004D, 0px 4px 8px -2px #0000004D',
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }} spacing={2}>
            <Box sx={{ maxWidth: '125px' }}>
              <Typography sx={{ fontSize: '20px', fontWeight: 400, wordWrap: 'break-word' }}>{title}</Typography>
              <Typography sx={{ fontSize: '14px', color: '#ABABAC', wordWrap: 'break-word' }}>{description}</Typography>
            </Box>
            <CardMedia component="img" sx={{ width: '150px' }} image={image} alt={img_alt_text} />
          </Stack>
        </Card>
        <Button
          variant="outlined"
          sx={{
            borderRadius: '20px',
            borderColor: '#636364',
            color: 'white',
            padding: '10px 20px',
          }}
        >
          <Typography sx={{ fontSize: 14 }}>{btn_text}</Typography>
        </Button>
      </Stack>
    </BasicContainer>
  );
};

export default CardTextOverlayAndButtonComponent;
