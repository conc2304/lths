export default function ButtonGroup(theme) {
  return {
    MuiButtonGroup: {
      styleOverrides: {
        root: {},
        outlined: {
          backgroundColkor: 'transparent'
        },
        grouped: {
          textTransform: 'uppercase',
          fontFamily: `'Roboto', sans-serif`,
          fontWeight: 400,
          fontSize: '0.9rem',
          padding: '9px 12px',
          height: '34px',
          transition: theme.transitions.create('background-color', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        groupedOutlinedPrimary: {
          border: '1px solid #D9D9D9',
          '&:hover': {
            backgroundColor: 'rgba(216, 216, 216, 0.4)',
          },
          '&.active': {
            background: '#e3f3ff',
          },
          '& .MuiTouchRipple-child': {
            backgroundColor: '#e3f3ff',
          },
        },
        groupedOutlinedSecondary: { // TODO just for testing
          color: "#000",
          border: '1px solid purple',
          '&:hover': {
            backgroundColor: 'cyan',
          },
          '&.active': {
            background: 'orange',
          },
          '& .MuiTouchRipple-child': {
            backgroundColor: 'pruple',
          },
        },
      },
    },
  };
}
