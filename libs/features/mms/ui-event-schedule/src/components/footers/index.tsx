import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { pxToRem } from '@lths/shared/utils';

import { EventType } from '../../types';
import { eventColorMap } from '../../utils';

type EventSchedulingFooterProps = {
  eventTypes: EventType[];
};

export const EventSchedulingFooter = (props: EventSchedulingFooterProps): JSX.Element => {
  const { eventTypes } = props;

  return (
    <>
      {[...eventTypes, { id: 'unknown', label: 'Unknown' }].map(({ id, label }) => (
        <Box key={id} display={'flex'} alignContent={'center'}>
          <Paper
            elevation={3}
            sx={{
              px: 0,
              width: pxToRem(28),
              height: pxToRem(28),
              minWidth: 'unset',
              backgroundColor: eventColorMap(id),
              borderRadius: '10%',
              mr: (theme) => theme.spacing(1.1),
            }}
          />
          <Typography variant="body1" pt={0.25} sx={{ mr: (theme) => theme.spacing(3) }}>
            {label}
          </Typography>
        </Box>
      ))}
      <Box key={'unknown'} display={'flex'} alignContent={'center'}>
        <Paper
          elevation={3}
          sx={{
            px: 0,
            width: pxToRem(28),
            height: pxToRem(28),
            minWidth: 'unset',
            backgroundColor: eventColorMap('unknown'),
            borderRadius: '10%',
            mr: (theme) => theme.spacing(1.1),
          }}
        />
        <Typography variant="body1" pt={0.25} sx={{ mr: (theme) => theme.spacing(3) }}>
          Unknown
        </Typography>
      </Box>
    </>
  );
};
