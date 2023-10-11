import { Typography, Card, CardContent, CardMedia, CardActionArea, Stack } from '@mui/material';

import { MOBILE_CAROUSEL_WIDTH } from '../../../../common';
import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import { Carousel } from '../../common';
import { FullHeightCarouselComponentProps } from '../../types';

const FullHeightCarouselComponent = (props: FullHeightCarouselComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
  } = props;
  const imageHeight = MOBILE_CAROUSEL_WIDTH * 2/3

  const eventComponents = sub_component_data.map((item, index) => {
    const { image, title, description, img_alt_text } = item;
    const edgeItemStyle = { ...(index === 0 && { paddingLeft: 20 }), ...(index === (sub_component_data.length - 1) && {paddingRight: 20 }) }
    
    return (
      <Stack key={index} style={edgeItemStyle} direction="column" alignItems="center" spacing={1.5}>
        <Card sx={{ maxWidth: MOBILE_CAROUSEL_WIDTH}}>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{ width: '100%', height: imageHeight, objectFit: 'cover' }}
              image={image}
              alt={img_alt_text}
            />
            <CardContent sx={{ bgcolor: colors.card.background, width: MOBILE_CAROUSEL_WIDTH, padding: '16px' }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  paddingBottom: 0.5,
                  fontSize: '1rem',
                  fontWeight: 450,
                  color: colors.editor.text,
                  wordWrap: 'break-word',
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: '0.875rem',
                  color: colors.editor.subText,
                  fontWeight: 400,
                  wordWrap: 'break-word',
                }}
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

export default FullHeightCarouselComponent;
