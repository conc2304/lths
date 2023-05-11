import * as React from 'react';
import { AddCircle } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';

import { ComponentProps } from '@lths/features/mms/ui-editor';

export function ComponentGallery({
  components = [],
  onSelectComponent,
}: {
  components: ComponentProps[];
  onSelectComponent: (componentId: string) => void;
}) {
  return (
    <ImageList variant="masonry" cols={5} gap={8}>
      {components.map((item, index) => (
        <ImageListItem key={`component_${index}`}>
          <img
            src={`${item.image_url}?w=248&fit=crop&auto=format`}
            srcSet={`${item.image_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.component_name}
            subtitle={item.component_id}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.component_name}`}
                onClick={() => onSelectComponent(item.component_id)}
              >
                <AddCircle />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
