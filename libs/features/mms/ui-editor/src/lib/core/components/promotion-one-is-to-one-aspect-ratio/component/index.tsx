import { Box, Typography, Button } from '@mui/material';

import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import { PromotionOneIsToOneAspectRatioComponentProps } from '../../types';

const PromotionOneIsToOneAspectRatioComponent = (props: PromotionOneIsToOneAspectRatioComponentProps) => {
  const {
    data: { image, img_alt_text, btn_text },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id} sx={{ marginX: 0 }}>
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
          <Button
            variant="contained"
            sx={{
              borderRadius: 6,
              backgroundColor: colors.button.background,
              color: colors.button.text,
              fontSize: '1rem',
              padding: '0.75rem 1.5rem',
            }}
          >
            <Typography sx={{ fontSize: 16 }}>{btn_text}</Typography>
          </Button>
        </Box>
      </Box>
    </BasicContainer>
  );
};

export default PromotionOneIsToOneAspectRatioComponent;
