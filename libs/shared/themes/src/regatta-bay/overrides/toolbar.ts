import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles';

export default function Toolbar(theme: Theme): Components {
  return {
    MuiToolbar: {
      styleOverrides: {
        root: {
          // paddingRight:1,
          //paddingLeft:1,
        },

        gutters: {
          //Examples of usage
          //  '@media (min-width: 600px)':
          // [theme.breakpoints.up(10000)]:

          [theme.breakpoints.up('xs')]: {
            paddingLeft: 12,
            paddingRight: 2,
          },
          gutters: {
            //Examples of usage
            //  '@media (min-width: 600px)':
            // [theme.breakpoints.up(10000)]:

            [theme.breakpoints.up('xs')]: {
              paddingLeft: 12,
              paddingRight: 2,
            },
          },
          dense: {
            // paddingBottom:100
          },
        },
      },
    },
  };
}
