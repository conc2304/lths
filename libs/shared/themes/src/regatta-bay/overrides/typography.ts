import { TypographyProps } from '@mui/material';
import { Components, Theme } from '@mui/material/styles';

export default function TypogragphyOverrides(theme: Theme): Components {
  return {
    MuiTypography: {
      defaultProps: {},
      styleOverrides: {
        root: ({ ownerState }: { ownerState: TypographyProps }) => {
          console.log({ ownerState });
          return {
            // overline
            ...(ownerState.variant === 'overline' && {
              '&&': {
                color: theme.palette.text.secondary,
                margin: '0 0 0.5rem 0',
              },
            }),
            ...(ownerState.variant === 'subtitle2' && {
              '&&': {
                color: theme.palette.text.secondary,
                margin: '0 0 0.5rem 0',
              },
            }),
          };
        },
      },
    },
  };
}
