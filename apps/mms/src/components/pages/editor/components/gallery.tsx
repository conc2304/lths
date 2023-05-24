import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { ComponentGalleryProps } from './types';

const ComponentGallery = ({ components = [], onSelect }: ComponentGalleryProps) => {
  return (
    <ImageList variant="masonry" cols={5} gap={35}>
      {components.map(({ image_url, component_name, component_id }, index) => (
        <ImageListItem key={`component_${index}`} onClick={() => onSelect(component_id)}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                src={`${image_url}?w=248&fit=crop&auto=format`}
                srcSet={`${image_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={component_id}
                loading="lazy"
                sx={{ padding: 2 }}
              />
              <CardContent sx={{ background: '#f6f6f6' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {component_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {component_id}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </ImageListItem>
      ))}
    </ImageList>
  );
};
export default ComponentGallery;
