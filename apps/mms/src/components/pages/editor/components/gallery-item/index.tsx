import { CardMedia, Typography } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';

import { Colors } from '@lths/features/mms/ui-editor';

import { COMPONENT_CARD_WIDTH } from '../../../../common/constants';
import { ComponentGalleryItemProps } from '../types';

const ComponentGalleryItem = (props: ComponentGalleryItemProps) => {
  const {
    component: { image_url, name, component_id },
    onSelect,
    index,
  } = props;

  return (
    <ImageListItem
      key={`component_${index}`}
      onClick={() => onSelect(component_id)}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
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
        sx={{ maxWidth: COMPONENT_CARD_WIDTH }}
      />
      <Typography gutterBottom variant="h5" component="div" color={Colors.componentLibrary.title} marginTop={'1.5rem'}>
        {name}
      </Typography>
    </ImageListItem>
  );
};

export default ComponentGalleryItem;
