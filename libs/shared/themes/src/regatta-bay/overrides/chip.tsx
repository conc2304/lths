import CloseIcon from '@mui/icons-material/Close';
import { Components, Theme } from '@mui/material/styles';

export default function Chip(theme: Theme): Components {
  return {
    MuiChip: {
      defaultProps: {
        size: 'medium',
        deleteIcon: <CloseIcon />,
      },
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[300],
          marginRight: theme.spacing(2.5),
          marginBottom: theme.spacing(0.5),
          marginTop: theme.spacing(0.5),

          '& .MuiChip-label': {
            paddingTop: '1px', // tweak to center better
            paddingRight: theme.spacing(4),
            paddingLeft: theme.spacing(2.25),
            textTransform: 'uppercase',
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: '0.75rem',
            letterSpacing: '0.15px',
          },

          '& .MuiSvgIcon-root': {
            fontSize: '1.25rem',
            marginRight: theme.spacing(1),
          },
        },
      },
    },
  };
}
