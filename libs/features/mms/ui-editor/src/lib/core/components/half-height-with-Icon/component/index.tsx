import { Card, CardContent, Typography, CardMedia, CardActions } from '@mui/material';

import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import { HalfHeightWithIconProps } from '../../types';
const HalfHeightWithIconComponent = (props: HalfHeightWithIconProps) => {
  const {
    __ui_id__: id,
    data: { title, icon, description },
  } = props;
  return (
    <BasicContainer id={id}>
      <Card sx={{ backgroundColor: colors.card.background, borderRadius: '10px' }}>
        <CardActions sx={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between' }}>
          <CardContent sx={{ padding: 0 }}>
            <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: '450', color: colors.editor.text }}>
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: '400',
                color: colors.editor.subText,
              }}
            >
              {description}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            image={icon}
            alt="Icon"
            sx={{ height: '56px', width: '56px', objectFit: 'contain' }}
          />
        </CardActions>
      </Card>
    </BasicContainer>
  );
};
export default HalfHeightWithIconComponent;
