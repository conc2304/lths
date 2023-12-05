import { Components, Theme } from '@mui/material/styles';

export default function Paper(theme: Theme): Components {
  return {
    MuiPaper: {
      defaultProps: {},
      styleOverrides: {
        root: ({ ownerState: { square, elevation } }) => {
          return {
            borderRadius: !square ? theme.shape.borderRadius : undefined,
            // this should really just be set with the elevation prop and not hardcoded
            // boxShadow:  0 ?  undefined: '0px 2px 4px 0px rgba(0,0,0,0.15)',
          };
        },
      },
    },
  };
}
