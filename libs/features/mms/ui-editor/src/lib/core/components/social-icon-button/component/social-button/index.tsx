import { Box, IconButton } from '@mui/material';

const SocialIcon = ({ icon }: { icon: string }) => {
  return (
    <Box>
      <IconButton>
        <img src={icon} alt={'Icon'} style={{ width: 24, height: 24 }} />
      </IconButton>
    </Box>
  );
};
export default SocialIcon;
