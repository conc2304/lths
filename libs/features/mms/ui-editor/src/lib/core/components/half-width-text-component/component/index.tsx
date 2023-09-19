import { Typography, Card, CardContent, CardMedia, CardActionArea, Stack, Button } from '@mui/material';

import { HALF_WIDTH_COMPONENT_WIDTH } from '../../../../common';
import { BasicContainer } from '../../../../elements/containers';
import { HalfWidthTextComponentProps } from '../../types';

const HalfWidthTextComponent = (props: HalfWidthTextComponentProps) => {
  const {
    __ui_id__: id,
    data: {
      btn_text,
      description,
      icon,
      image,
      section,
      sub_title,
      text_color,
      title,
    },
  } = props;
  
  const cardBackgroundColor = '#242526';
  const titleColor = text_color ? text_color : '#ffffff';
  const subTitleColor = text_color ? text_color : '#ffffff69';
  const sectionColor = text_color ? text_color : '#ffffff69';
  const descriptionColor = text_color ? text_color : '#ABABAC';
  const buttonColor = '#ffffff';
  const borderColor = '#636364';

  const aspectRatio = 2 / 3;
  const calculatedHeight = Math.round(HALF_WIDTH_COMPONENT_WIDTH * aspectRatio);

  return (
    <BasicContainer id={id}>
      <Stack direction="column" alignItems="center" spacing={1.5}>
        <Card sx={{ maxWidth: HALF_WIDTH_COMPONENT_WIDTH, bgcolor: cardBackgroundColor }}>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{ width: HALF_WIDTH_COMPONENT_WIDTH, height: calculatedHeight, objectFit: 'cover' }}
              image={image}
            />
            <CardContent sx={{ bgcolor: cardBackgroundColor, padding: '12px', borderColor: cardBackgroundColor }}>
              <Typography sx={{ fontSize: 12, lineHeight: 1.3, fontWeight: 450, color: titleColor }} >
                {title}
              </Typography>
              <Typography 
                gutterBottom
                sx={{
                  fontSize: 10,
                  fontWeight: 450,
                  color: subTitleColor,
                }}
              >
                {sub_title}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                sx={{ fontSize: 11, color: descriptionColor, fontWeight: 400 }}
              >
                {description}
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0.5}>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                  <CardMedia
                    component="img"
                    image={icon}
                    sx={{ height: '10px', width: '10px', objectFit: 'contain' }}
                  />
                  <Typography
                    gutterBottom
                    sx={{
                      fontSize: 10,
                      fontWeight: 450,
                      color: sectionColor,
                    }}
                  >
                    {section}
                  </Typography>
                </Stack>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: '20px',
                    borderColor: borderColor,
                    color: buttonColor,
                    padding: '4px 8px',
                    minWidth: 0,
                  }}
                >
                  <Typography sx={{ fontSize: 10 }}>{btn_text}</Typography>
                </Button>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>
    </BasicContainer>
  );
};

export default HalfWidthTextComponent;
