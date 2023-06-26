import { Box, Button, Divider, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';

import Title from './Title';

const labelStyles = {
  color: 'black',
  fontWeight: 500,
  fontSize: '0.825rem',
};

const Settings = (props) => {
  const { status } = props;

  const isPublished = status === 'published';

  return (
    <Box style={{ backgroundColor: '#F3F3F3', padding: 16 }}>
      <Grid container direction="row" alignItems="stretch" marginY={3} sx={{ minHeight: '250px', gap: 15 }}>
        <Grid item xs={3}>
          <Title
            title="Page details"
            description="Explain how this setting works and what the user can specify."
            infoText="Explain how this setting works and what the user can specify."
          />
          <Stack marginTop={4}>
            <InputLabel sx={labelStyles}>PAGE NAME</InputLabel>
            {isPublished ? (
              <Typography sx={{ marginTop: 2, height: '1.75rem' }}>Home Pre-Game</Typography>
            ) : (
              <OutlinedInput value="Home Pre-Game" sx={{ background: 'white', marginTop: 2 }} />
            )}
          </Stack>
          <Stack marginTop={5}>
            <InputLabel sx={labelStyles}>DESCRIPTION (optional)</InputLabel>
            <OutlinedInput
              value="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis"
              multiline={true}
              sx={{ background: 'white', marginTop: 2 }}
            />
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Title
            title="System"
            description="Explain how this setting works and what the user can specify."
            infoText="Explain how this setting works and what the user can specify."
          />
          <Stack marginTop={4}>
            <InputLabel sx={labelStyles}>DEFAULT PAGE</InputLabel>
            <Typography sx={{ marginTop: 2, height: '1.75rem' }}>Home</Typography>
          </Stack>
          <Stack marginTop={isPublished ? 5 : 8}>
            <InputLabel sx={labelStyles}>PAGE ID</InputLabel>
            <Typography sx={{ marginTop: 2 }}>/HOME_PREGAME</Typography>
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ borderBottomWidth: 2, marginY: 6 }} />
      <Stack direction="row" justifyContent={'flex-end'} paddingX={2}>
        <Button variant="outlined" sx={{ marginRight: 2 }}>
          CANCEL
        </Button>
        <Button variant="contained">SAVE</Button>
      </Stack>
    </Box>
  );
};

export default Settings;
