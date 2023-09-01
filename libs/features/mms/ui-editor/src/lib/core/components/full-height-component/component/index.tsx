import { Card, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Stack } from '@mui/system';

import { BasicContainer } from '../../../../elements';
import { FullHeightFloatingTextProps } from '../../types';

const FullHeightFloatingTextComponent = (props: FullHeightFloatingTextProps) => {
  const {
    __ui_id__: id,
    data: { title, image, description },
  } = props;

  return (
    <BasicContainer id={id} sx={{ backgroundColor: 'black', padding: '1rem' }}>
      <Stack spacing={1}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="224"
              width="335"
              image={image}
              alt={title}
              sx={{ borderRadius: '.5rem' }}
            />
          </CardActionArea>
        </Card>
        <Typography gutterBottom variant="h5" sx={{ color: 'white', paddingTop: '.65rem', fontWeight: 450 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#ABABAC', fontSize: '1rem' }}>
          {description}
        </Typography>
      </Stack>
    </BasicContainer>
  );
};

export default FullHeightFloatingTextComponent;
