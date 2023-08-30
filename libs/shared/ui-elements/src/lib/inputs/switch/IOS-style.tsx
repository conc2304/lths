import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';

type IOSSwitchProps = {
  trackActiveColor?: string;
  trackInactiveColor?: string;
  thumbColor?: string;
};

export const IOSSwitch = styled((props: SwitchProps & IOSSwitchProps) => {
  const { trackActiveColor, trackInactiveColor, thumbColor, ...switchProps } = props;
  return <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...switchProps} />;
})(
  ({
    theme,
    trackActiveColor = '#4DB2FF',
    trackInactiveColor = theme.palette.grey[500],
    size = 'medium',
    thumbColor = theme.palette.grey[100],
  }) => ({
    width: size === 'medium' ? 42 : 30,
    height: size === 'medium' ? 23 : 18,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 3,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: `translateX(${size === 'medium' ? 18 : 12}px)`,
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: trackActiveColor,
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: thumbColor,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.7,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: size === 'medium' ? 17 : 12,
      height: size === 'medium' ? 17 : 12,
    },
    '& .MuiSwitch-track': {
      borderRadius: 23 / 2,
      backgroundColor: trackInactiveColor,
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  })
);
