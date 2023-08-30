import { ComponentType } from 'react';
import { Box } from '@mui/material';
import { Property } from 'csstype';

import { TimeSlotWrapper, TimeSlotWrapperProps } from '../time-slot-wrapper';

export type TimeGutterWrapperProps = TimeSlotWrapperProps & {
  slotMetrics?: Record<string, unknown> & {
    groups: [Date, Date][];
  };
  // LTHS props
  gutterWidth: Property.Width;
};

export const TimeGutterWrapper: ComponentType<TimeGutterWrapperProps> = (props): JSX.Element => {
  const { children, slotMetrics, gutterWidth = '60px', ...timeSlotWrapperProps } = props;

  return (
    <Box width={gutterWidth} paddingX={1} className="TimeGutterWrapper--root" boxSizing={'border-box'}>
      {children &&
        children.props.children.map((child: { props: { group: [Date, Date] } }, i: number) => {
          const [start, half] = child.props.group;
          const props: TimeSlotWrapperProps = { ...timeSlotWrapperProps, slotTimes: [start, half] };
          return (
            <Box key={i} display={'flex'} flexDirection={'column'} paddingBottom={'1px'}>
              <TimeSlotWrapper
                data-testid="TimeGutterWrapper--time-slot"
                className={'TimeGutterWrapper--time-slot'}
                {...props}
                slotWidth={gutterWidth}
              ></TimeSlotWrapper>
            </Box>
          );
        })}
    </Box>
  );
};
