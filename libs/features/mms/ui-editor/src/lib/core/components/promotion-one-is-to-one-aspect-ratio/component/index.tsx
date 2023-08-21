import { Box, Typography, Button } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { PromotionOneIsToOneAspectRatioComponentProps } from '../../types';


const PromotionOneIsToOneAspectRatioComponent = (props: PromotionOneIsToOneAspectRatioComponentProps) => {
  const {
    properties_data: { 
      image, img_alt_text,
      btn_text
    },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id} sx={{margin: 0}}>
      <Box
        aria-label={img_alt_text}
        sx={{
          width: '100%',
          position: 'relative',
          paddingBottom: '100%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${image})`,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '74.5%',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button variant="contained"
            sx={{
              borderRadius: "24px",
              backgroundColor: "white",
              color: "black",
              padding: "12px 25px"
            }}
          >
            <Typography sx={{ fontSize: 16 }}>
              {btn_text}
            </Typography>
          </Button>
        </Box>
      </Box>
    </BasicContainer>
  );
};

export default PromotionOneIsToOneAspectRatioComponent;
