import { CircularProgress, Stack } from '@mui/material';
import ImageList from '@mui/material/ImageList';

import ComponentGalleryItem from '../gallery-item';
import { ComponentGalleryProps } from '../types';

const ComponentGallery = ({ components = [], onSelect, isComponentListLoading }: ComponentGalleryProps) => {
  if (isComponentListLoading)
    return (
      <Stack justifyContent="center" alignItems="center" paddingY={4}>
        <CircularProgress color="primary" />
      </Stack>
    );

  return (
    <ImageList
      cols={2}
      sx={{
        margin: 0,
      }}
    >
      {components.map((component, index) => (
        <ComponentGalleryItem key={component.component_id} component={component} onSelect={onSelect} index={index} />
      ))}
    </ImageList>
  );
};
export default ComponentGallery;
