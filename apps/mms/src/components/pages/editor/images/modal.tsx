import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/system';

import ImageGallery from './gallery';
import { ImageModalProps } from './types';

const ImageModal = ({ open, onClose, onSelect, images = [] }: ImageModalProps) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography sx={{ fontSize: '1.5rem' }}>Select an Image</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: () => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ height: '40rem', padding: 0 }}>
        <Grid container flexWrap="nowrap">
          <Grid item xs={3}>
            <Stack sx={{ padding: '1.5rem' }}>
              <TextField
                fullWidth
                label="Search"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: '3rem' },
                }}
              ></TextField>
            </Stack>
            <Divider />
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ height: '40rem', padding: 0 }} />
          <Grid item xs={9} sx={{ padding: 1 }}>
            {images && <ImageGallery images={images} onSelect={onSelect} />}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
