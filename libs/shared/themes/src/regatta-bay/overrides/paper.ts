import { Components, Theme } from '@mui/material/styles';

export default function Paper(theme: Theme): Components {
  return {
    MuiPaper: {
      defaultProps: {},
      styleOverrides: {
        root: ({ ownerState: { square } }) => {
          return {
            borderRadius: !square ? 2 * theme.shape.borderRadius : undefined,
          };
        },
      },
    },
  };
}
