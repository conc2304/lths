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
    <ImageList>
      <ImageListItem key="Subheader" cols={3}>
        <ListSubheader component="div">Component Gallery</ListSubheader>
      </ImageListItem>
      {components.map((item) => (
        <ImageListItem key={item.image_url}>
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
