import { Box, Typography, CardMedia, Button, Stack } from '@mui/material';

import { BasicContainer } from '../../../../../elements';
import { SiloTextAndButtonComponentProps } from '../../../types';

const SiloTextAndButtonComponent = (props: SiloTextAndButtonComponentProps) => {
  const {
    data: { image, img_alt_text, title, description, btn_text },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id} sx={{ background: 'linear-gradient(180deg, #888888, #000000)' }}>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={0} sx={{ padding: '32px 0' }}>
        <CardMedia component="img" sx={{ width: '166px', paddingBottom: 1 }} image={image} alt={img_alt_text} />
        <Box sx={{ paddingBottom: 2 }}>
          <Typography
            sx={{ fontSize: '16px', color: 'white', fontWeight: 400, wordWrap: 'break-word', textAlign: 'center' }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#ABABAC', wordWrap: 'break-word', textAlign: 'center' }}>
            {description}
          </Typography>
        </Box>
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

export default SiloTextAndButtonComponent;
