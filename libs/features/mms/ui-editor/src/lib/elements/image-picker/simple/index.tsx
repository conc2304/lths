import React from 'react';
import { Typography, Card, CardMedia, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { ToolbarProps } from '../../../context';
import GroupLabel from '../../labels/group-label';

type SimpleImagePickerProps = {
  value: string;
  onChange: (value: string) => void;
  onReplace: ToolbarProps['onPropChange'];
};

const SimpleImagePicker = ({ value, onChange, onReplace }: SimpleImagePickerProps) => {
  const handleReplace = () => {
    onReplace && onReplace('image_url', onChange);
  };

  const imageSrc = value;
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
            {!imageSrc && (
              <Button
                variant="contained"
                sx={{
                  padding: '4px 15px',
                  boxShadow: 'none',
                  border: '1px solid #BDBDBD',
                  color: '#3D4752',
                  backgroundColor: '#FFFFFF',
                  '&:hover': { backgroundColor: '#FFFFFF' },
                }}
              >
                <AddIcon sx={{ fontSize: 32, paddingRight: 1 }} />
                <Typography
                  sx={{ fontSize: 15, fontWeight: 'bold', letterSpacing: '0.46px', whiteSpace: 'nowrap' }}
                  textTransform={'uppercase'}
                >
                  Add Image
                </Typography>
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SimpleImagePicker;
