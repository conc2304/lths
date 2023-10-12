import React, { useState } from 'react';
import { Card, CardMedia, Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

import IconTextButton from './icon-text-button';
import { Colors } from '../../../common';
import { ToolbarProps } from '../../../context';
import GroupLabel from '../../labels/group-label';

type SimpleImagePickerProps = {
  value: string;
  onChange: (value: string) => void;
  onReplace: ToolbarProps['onPropChange'];
};

const SimpleImagePicker = ({ value, onChange, onReplace }: SimpleImagePickerProps) => {
  const imageSrc = value;
  const [isHovering, setIsHovering] = useState(false);

  const handleReplace = () => {
    onReplace && onReplace('image_url', onChange);
    setIsHovering(false);
  };

  const handleDelete = () => {
    onChange('');
    setIsHovering(false);
  };

  return (
    <Box data-testid="SimpleImagePicker" sx={{ '.sketch-picker': { boxShadow: 'none', border: 'none' } }}>
      <GroupLabel label={'Image'} />
      <Box
        sx={{
          paddingTop: 1,
          position: 'relative',
          width: '100%',
        }}
      >
        <Box
          onMouseEnter={() => {
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
          sx={{
            cursor: 'pointer',
            paddingBottom: `${75}%`,
            position: 'relative',
            width: '100%',
            backgroundColor: Colors.simpleImagePicker.image.background,
          }}
        >
          <Card
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '4px',
              backgroundColor: Colors.simpleImagePicker.image.background,
            }}
          >
            {imageSrc && (
              <CardMedia
                component="img"
                image={imageSrc}
                alt="Selected Image"
                sx={{ objectFit: 'cover', height: '100%', width: '100%' }}
              />
            )}
          </Card>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {imageSrc ? (
              isHovering && (
                <Stack spacing={1}>
                  <IconTextButton
                    icon={<RefreshIcon sx={{ fontSize: 32, paddingRight: 1 }} />}
                    text="Change"
                    onClick={handleReplace}
                  />
                  <IconTextButton
                    icon={<DeleteIcon sx={{ fontSize: 32, paddingRight: 1 }} />}
                    text="Remove"
                    onClick={handleDelete}
                  />
                </Stack>
              )
            ) : (
              <IconTextButton
                icon={<AddIcon sx={{ fontSize: 32, paddingRight: 1 }} />}
                text="Add Image"
                onClick={handleReplace}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SimpleImagePicker;
