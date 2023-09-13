import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  onClick: () => void;
};

export const CloseIconButton = ({ onClick }: Props) => {
  return (
    <IconButton
      aria-label="close"
      onClick={onClick}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon fontSize="large" sx={{ stroke: 'white', strokeWidth: 1 }} />
    </IconButton>
  );
};
