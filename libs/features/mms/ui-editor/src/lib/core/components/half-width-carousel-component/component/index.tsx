import { Typography, Card, CardContent, CardMedia, CardActionArea, Stack } from '@mui/material';

import { MOBILE_CAROUSEL_HALF_WIDTH } from '../../../../common';
import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import { Carousel } from '../../common';
import { HalfWidthCarouselComponentProps } from '../../types';

const HalfWidthCarouselComponent = (props: HalfWidthCarouselComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
  } = props;
  const imageHeight = MOBILE_CAROUSEL_HALF_WIDTH * 2/3;
  
  const eventComponents = sub_component_data.map((item, index) => {
    const { image, title, description, img_alt_text } = item;
    const edgeItemStyle = { ...(index === 0 && { paddingLeft: 20 }), ...(index === (sub_component_data.length - 1) && {paddingRight: 20 }) }
    
    return (
      <Stack key={index} style={edgeItemStyle} direction="column" alignItems="center" spacing={1.5}>
        <Card key={index} sx={{ maxWidth: MOBILE_CAROUSEL_HALF_WIDTH, bgcolor: colors.card.background }}>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{ width: MOBILE_CAROUSEL_HALF_WIDTH, height: imageHeight, objectFit: 'cover', bgcolor: 'white' }}
              image={image}
              alt={img_alt_text}
            />
            <CardContent
              sx={{ bgcolor: colors.card.background, padding: '16px', borderColor: colors.card.background }}
            >
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 450,
                  color: colors.editor.text,
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.875rem', color: colors.editor.subText, fontWeight: 400 }}
              >
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>
    )
  });

  return (
    <BasicContainer style={{ marginRight: 0, marginLeft: 0 }} id={id}>
      <Carousel items={eventComponents} />
    </BasicContainer>
  );
};
export default HalfWidthCarouselComponent;
