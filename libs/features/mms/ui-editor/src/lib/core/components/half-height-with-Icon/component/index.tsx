import { Card, CardContent, Typography, CardMedia, CardActions } from '@mui/material';

import { HalfHeightWithIconProps } from '../../types';
const HalfHeightWithIconComponent = (props: HalfHeightWithIconProps) => {
  const {
    __ui_id__: id,
    default_data: { title, icon, description },
  } = props;
  return (
    <Card id={id} sx={{ backgroundColor: '#242526', borderRadius: '10px' }}>
      <CardActions sx={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between' }}>
        <CardContent sx={{ padding: 0 }}>
          <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: '450', color: '#FFFFFF' }}>
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: '400',
              color: '#ABABAC',
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
  );
};
export default HalfHeightWithIconComponent;
