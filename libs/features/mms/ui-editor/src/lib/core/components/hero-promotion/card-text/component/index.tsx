import { Box, Typography, Card, CardMedia, Stack } from '@mui/material';

import { BasicContainer } from '../../../../../elements';
import { CardTextComponentProps } from '../../../types';


const CardTextComponent = (props: CardTextComponentProps) => {
  const {
    properties_data: { 
      image, img_alt_text,
      title, description,
    },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id} sx={{background: 'linear-gradient(180deg, #888888, #000000)',}}>
      <Stack
        direction="column" justifyContent="center" alignItems="center" spacing={1.5}
        sx={{padding: "32px 0"}}
      >
        <Card sx={{ 
          backgroundColor: "#F5F5F5",
          width: "335px", height: "192px",
          borderRadius: "10px", boxShadow: "0px 16px 24px -4px #0000004D, 0px 4px 8px -2px #0000004D",
        }}>
          <CardMedia
            component="img"
            image={image}
            alt={img_alt_text}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </Card>
        <Box sx={{ maxWidth: "335px"}}>
          <Typography sx={{ 
              fontSize: "16px", color: "white",
              textAlign: 'center', wordWrap: 'break-word' 
          }}>
            {title}
          </Typography>
          <Typography sx={{
            fontSize: "14px", color: "#ABABAC",
            textAlign: 'center', wordWrap: 'break-word' 
          }}>
            {description}
          </Typography>
        </Box>
      </Stack>
    </BasicContainer>
  );
};

export default CardTextComponent;
