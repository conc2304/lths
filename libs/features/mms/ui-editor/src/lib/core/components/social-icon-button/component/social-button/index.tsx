import { IconButton } from '@mui/material';

const SocialIcon = ({ icon }: { icon: string }) => {
  return (
    <IconButton sx={{ padding: 0 }}>
      <img src={icon} alt={'Icon'} style={{ width: 48, height: 48 }} />
    </IconButton>
  );
};
export default SocialIcon;
