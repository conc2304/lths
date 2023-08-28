import React, { useState } from 'react';
import { Typography, Card, CardMedia, Box, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';

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
          border: '1px solid #BDBDBD',
          color: '#3D4752',
          backgroundColor: '#FFFFFF',
          '&:hover': { backgroundColor: '#FFFFFF' },
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
            backgroundColor: '#F5F5F5',
          }}
        >
          <Card sx={{ position: 'absolute', inset: 0, backgroundColor: '#F5F5F5', borderRadius: '4px' }}>
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
