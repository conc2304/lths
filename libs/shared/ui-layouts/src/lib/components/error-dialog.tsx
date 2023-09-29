import { ReactNode } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

type ErrorDialogProps = {
  message?: string | ReactNode;
};

export const ErrorDialog = (props: ErrorDialogProps) => {
  const {
    message = (
      <>
        <p>
          Oops! Looks like our code tried to score a goal but hit the crossbar. We're coaching it up for the next play.
        </p>
        <p>Try going Back, or back to Home</p>
      </>
    ),
  } = props;
  const navigate = useNavigate();

  return (
    <Dialog open={true} fullWidth maxWidth="xs">
      <DialogTitle>Something went wrong</DialogTitle>
      <DialogContent>
        <Box>{typeof message === 'string' ? <Typography variant="h3">{message}</Typography> : message}</Box>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignContent: 'center',
            pb: 2,
          }}
        >
          <Button
            onClick={() => navigate('/', { replace: true })}
            color="primary"
            variant="contained"
            size="large"
            endIcon={<HomeIcon />}
          >
            Home
          </Button>
          <Button onClick={() => navigate(-1)} color="primary" variant="contained" size="large" endIcon={<ArrowBack />}>
            Back
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
