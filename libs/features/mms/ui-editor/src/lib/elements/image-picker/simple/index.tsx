import React, { useState } from 'react';
import { Typography, Card, CardMedia, Box, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

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
  const [ isHovering, setIsHovering ] = useState(false);

  const handleReplace = () => {
    onReplace && onReplace('image_url', onChange);
  };

  const handleDelete = () => {
    onChange('');
  };

  const IconButtonWithText = ({ icon, text, onClick }) => {
    const buttonOnClickOnly = (event) => {
      event.stopPropagation()
      onClick(event);
      setIsHovering(false);
    }

    return (
      <Button
        onClick={buttonOnClickOnly}
        variant="contained"
        sx={{
          padding: '4.5px 19px',
          boxShadow: 'none',
          border: `1px solid ${Colors.simpleImagePicker.button.border}`,
          color: Colors.simpleImagePicker.button.text,
          backgroundColor: Colors.simpleImagePicker.button.background,
          '&:hover': { backgroundColor: Colors.simpleImagePicker.button.background },
        }}
      >
        {icon}
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 'bold',
            letterSpacing: '0.46px',
            whiteSpace: 'nowrap',
          }}
          textTransform="uppercase"
        >
          {text}
        </Typography>
      </Button>
    );
  };

  return (
    <Box data-testid="SimpleImagePicker" sx={{ '.sketch-picker': { boxShadow: 'none', border: 'none' } }}>
      <GroupLabel label={'Image'} />
      <Box
        sx={{
          paddingTop: 1,
          position: 'relative',
          width: '100%',
          maxWidth: 352,
          minWidth: 272,
        }}
      >
        <Box
          onClick={handleReplace}
          onMouseEnter={() => {setIsHovering(true)}}
          onMouseLeave={() => {setIsHovering(false)}}
          sx={{
            cursor: 'pointer',
            paddingBottom: `${75}%`,
            position: 'relative',
            width: '100%',
            backgroundColor: Colors.simpleImagePicker.image.background,
          }}
        >
          <Card sx={{ position: 'absolute', inset: 0, borderRadius: '4px', backgroundColor: Colors.simpleImagePicker.image.background }}>
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
            {imageSrc ? 
              ( isHovering &&
                (
                <Stack spacing={1} >
                  <IconButtonWithText 
                    icon={<RefreshIcon sx={{ fontSize: 32, paddingRight: 1 }} />} 
                    text="Change"
                    onClick={handleReplace}
                  />
                  <IconButtonWithText 
                    icon={<DeleteIcon sx={{ fontSize: 32, paddingRight: 1 }} />} 
                    text="Remove"
                    onClick={handleDelete}
                  />
                </Stack>
                )
              )
              : 
              (
                <IconButtonWithText 
                  icon={<AddIcon sx={{ fontSize: 32, paddingRight: 1 }} />} 
                  text="Add Image"
                  onClick={handleReplace}
                />
              )
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SimpleImagePicker;
