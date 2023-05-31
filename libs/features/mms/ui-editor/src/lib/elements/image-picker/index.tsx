import React from 'react';
import { Avatar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

type ImagePickerProps = {
  value: string;
  onChange: (value: string) => void;
  onReplace: (callback: (url: string) => void) => void;
};

const ImagePicker = ({ value, onChange, onReplace }: ImagePickerProps) => {
  const handleReplace = () => {
    onReplace && onReplace(onChange);
  };

  const handleDelete = () => {
    onChange('');
  };

  return (
    <Box sx={{ '.sketch-picker': { boxShadow: 'none', border: 'none' } }}>
      {value ? (
        <React.Fragment>
          <Typography sx={{ fontSize: 12, marginBottom: 1 }} textTransform={'uppercase'}>
            Image style
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
            <img src={value} alt={value} height="300px" />
          </Box>
          <Button variant="text" onClick={handleReplace} sx={{ textTransform: 'uppercase' }}>
            Replace
          </Button>
          <Button variant="text" onClick={handleDelete} sx={{ textTransform: 'uppercase' }}>
            Delete
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ fontSize: 12, marginBottom: 1 }} textTransform={'uppercase'}>
            Add Image
          </Typography>

          <Box>
            <Box
              alignItems="center"
              flexDirection="column"
              sx={{
                height: '12rem',
                border: '4px dotted #D9D9D9',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '2rem',
              }}
            >
              <Avatar sx={{ color: 'black', backgroundColor: '#D9D9D9' }}>
                <AddIcon onClick={handleReplace}></AddIcon>
              </Avatar>
              <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginTop: 1 }}>Add an image</Typography>
              <Typography sx={{ color: '#6D7278' }}>20 MB max</Typography>
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
export default ImagePicker;
