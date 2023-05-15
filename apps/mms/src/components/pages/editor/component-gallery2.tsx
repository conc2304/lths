import * as React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
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
    <ImageList variant="masonry" cols={5} gap={35}>
      {components.map(({ image_url, component_name, component_id }, index) => (
        <ImageListItem key={`component_${index}`} onClick={() => onSelectComponent(component_id)}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                //height="140"
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
}
