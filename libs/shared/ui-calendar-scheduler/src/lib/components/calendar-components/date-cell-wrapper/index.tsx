import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { isSameDay } from 'date-fns';
import { DateCellWrapperProps } from 'react-big-calendar';

import { LTHSView } from '../../../types';

type DateCellProps = DateCellWrapperProps & { view?: LTHSView };

export const DateCellWrapper = (props: DateCellProps) => {
  const { value: date, children } = props;

  const today = new Date();
  const isOffRange = children.props.className.includes('rbc-off-range');
  const isCurrent = isSameDay(today, date);
  const theme = useTheme();

  const getBackgroundColor = () => {
    if (isOffRange) {
      return theme.palette.grey[100];
    } else if (isCurrent) {
      return null;
    } else {
      return null;
    }
  };

  return (
    <Box
      sx={{
        borderRight: '1px solid var(--cell-border-color, #D8D8D8)',
        backgroundColor: getBackgroundColor(),
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
};
