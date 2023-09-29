import { Typography, Card, CardContent, CardMedia, Stack, Button } from '@mui/material';

import { HALF_WIDTH_COMPONENT_WIDTH } from '../../../../common';
import colors from '../../../../common/colors';
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

  const aspectRatio = 2 / 3;
  const calculatedHeight = Math.round(HALF_WIDTH_COMPONENT_WIDTH * aspectRatio);

  return (
    <BasicContainer id={id}>
      <Stack direction="column" alignItems="center" spacing={1.5}>
        <Card sx={{ maxWidth: HALF_WIDTH_COMPONENT_WIDTH, bgcolor: colors.halfWidthText.background }}>
          <CardMedia
            component="img" data-testid="card_image"
            sx={{ width: HALF_WIDTH_COMPONENT_WIDTH, height: calculatedHeight, objectFit: 'cover' }}
            image={image}
          />
          <CardContent sx={{ bgcolor: colors.halfWidthText.background, padding: '12px', borderColor: colors.halfWidthText.background }}>
            <Typography sx={{ fontSize: 12, lineHeight: 1.3, fontWeight: 450, color: text_color ? text_color : colors.halfWidthText.titleText }} >
              {title}
            </Typography>
            <Typography 
              gutterBottom
              sx={{
                fontSize: 10,
                fontWeight: 450,
                color: text_color ? text_color : colors.halfWidthText.subTitleText,
              }}
            >
              {sub_title}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              sx={{ fontSize: 11, fontWeight: 400, color: text_color ? text_color : colors.halfWidthText.descriptionText }}
            >
              {description}
            </Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0.5}>
              <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                <CardMedia
                  component="img" data-testid="section_icon"
                  image={icon}
                  sx={{ height: '10px', width: '10px', objectFit: 'contain' }}
                />
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: 10,
                    fontWeight: 450,
                    color: text_color ? text_color : colors.halfWidthText.sectionText,
                  }}
                >
                  {section}
                </Typography>
              </Stack>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: '20px',
                  borderColor: colors.halfWidthText.button.border,
                  color: colors.halfWidthText.button.text,
                  padding: '4px 8px',
                  minWidth: 0,
                }}
              >
                <Typography sx={{ fontSize: 10 }}>{btn_text}</Typography>
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </BasicContainer>
  );
};

export default HalfWidthTextComponent;
