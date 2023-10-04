import { Stack, Typography, IconButton } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { EventInfoComponentProps } from '../../types';

const EventInfoComponent = (props: EventInfoComponentProps) => {
  const {
    __ui_id__: id,
    data: { location_text, time_text, location_icon, time_icon },
  } = props;
  console.log('porps', props);

  return (
    <BasicContainer id={id}>
      <Stack flexDirection={'column'} justifyContent={'flex-start'} alignItems="flex-start" spacing={0.5}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
          <IconButton sx={{ padding: 0 }}>
            <img src={location_icon} alt={'Icon'} style={{ width: 24, height: 24 }} />
          </IconButton>
          <Typography sx={{ fontWeight: 500, fontSize: 16, color: '#FFF' }}>{location_text}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
          <IconButton sx={{ padding: 0 }}>
            <img src={time_icon} alt={'Icon'} style={{ width: 24, height: 24 }} />
          </IconButton>
          <Typography sx={{ fontWeight: 500, fontSize: 16, color: '#FFF' }}>{time_text}</Typography>
        </Stack>
      </Stack>
    </BasicContainer>
  );
};
export default EventInfoComponent;
