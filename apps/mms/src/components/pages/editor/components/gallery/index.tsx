import { CardMedia, Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { ComponentGalleryProps } from '../types';

const ComponentGallery = ({ components = [], onSelect }: ComponentGalleryProps) => {
  return (
    <ImageList
      cols={2}
      sx={{
        backgroundColor: '#000',
        margin: 0,
      }}
    >
      {components.map(({ image_url, name, component_id }, index) => (
        <ImageListItem
          key={`component_${index}`}
          onClick={() => onSelect(component_id)}
          sx={{
            textAlign: 'center',
            padding: '2.5rem',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          <CardMedia
            component="img"
            src={`${image_url}?w=248&fit=crop&auto=format`}
            srcSet={`${image_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={component_id}
            loading="lazy"
          />
          <Typography gutterBottom variant="h5" component="div" color={'#9E9E9E'} marginTop={'1.5rem'}>
            {name}
          </Typography>
        </ImageListItem>
      ))}
    </ImageList>
  );
};
export default ComponentGallery;
