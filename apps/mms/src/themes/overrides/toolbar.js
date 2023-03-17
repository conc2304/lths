export default function Toolbar(theme) {
  return {
    MuiToolbar: {

      styleOverrides: {
        root: {
          // paddingRight:1,
          //paddingLeft:1,
        },
        colorPrimary: {
          backgroundColor: theme.palette.primary
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

      }
    }
  }

}
