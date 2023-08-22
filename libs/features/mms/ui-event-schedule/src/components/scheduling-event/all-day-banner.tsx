import { SvgIconComponent } from '@mui/icons-material';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { Box, SxProps } from '@mui/system';

type AllDayBannerProps = {
  isInAllDayRow: boolean;
  text?: string;
  containerWidth: number;
  icon?: SvgIconComponent;
  breakpoint?: number;
  sx?: SxProps;
};
export const AllDayBanner = (props: AllDayBannerProps) => {
  const {
    isInAllDayRow,
    containerWidth,
    text = 'NEW EVENT ADDED',
    icon: Icon = FiberNewIcon,
    breakpoint = 125,
    sx = {},
  } = props;

  const isFullSize = containerWidth > breakpoint;

  const baseSX: SxProps = {
    borderRadius: '6px',
    opacity: 1,
    backgroundColor: '#4b9bd9',
  };

  const eventSX: SxProps = {
    width: '100%',
    p: isFullSize ? 1 : 0.2,
    textAlign: isFullSize ? undefined : 'center',
  };

  const allDaySX: SxProps = {
    p: 0.25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ml: 0.2,
  };

  return (
    <Box
      className="CalendarEvent--new-event"
      sx={{
        ...baseSX,
        ...(!isInAllDayRow ? eventSX : allDaySX),
        ...sx,
      }}
    >
      {isFullSize && !isInAllDayRow ? text : <Icon htmlColor="#FFF" sx={{ textAlign: 'center' }} />}
    </Box>
  );
};
