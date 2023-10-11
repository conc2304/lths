import { Typography, Card, CardMedia, Stack } from '@mui/material';

import { MOBILE_CAROUSEL_HALF_WIDTH } from '../../../../common';
import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements/containers';
import { Carousel } from '../../common';
import { HalfWidthCarouselFloatingTextComponentProps } from '../../types';

const HalfWidthCarouselFloatingTextComponent = (props: HalfWidthCarouselFloatingTextComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
  } = props;
  const imageHeight = MOBILE_CAROUSEL_HALF_WIDTH * 1;

  const eventComponents = sub_component_data.map((item, index) => {
    const { image, img_alt_text, title } = item;
    const edgeItemStyle = { ...(index === 0 && { paddingLeft: 20 }), ...(index === (sub_component_data.length - 1) && {paddingRight: 20 }) }
    
    return (
      <Stack key={index} style={edgeItemStyle} direction="column" alignItems="center" spacing={1.5}>
        <Card
          sx={{
            width: MOBILE_CAROUSEL_HALF_WIDTH,
            height: imageHeight,
            borderRadius: '10px',
            boxShadow: 'none',
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            image={image}
            alt={img_alt_text}
          />
        </Card>
        <Typography sx={{ width: MOBILE_CAROUSEL_HALF_WIDTH, fontSize: 14, textAlign: 'left', color: colors.editor.text }}>
          {title}
        </Typography>
      </Stack>
    )
  });

  return (
    <BasicContainer style={{ marginRight: 0, marginLeft: 0 }} id={id}>
      <Carousel items={eventComponents} />
    </BasicContainer>
  );
};

export default HalfWidthCarouselFloatingTextComponent;
