import { Typography, IconButton, Box } from '@mui/material';

import { BasicContainer } from '../../../../../elements';
import { EventInfoComponentProps } from '../../../types';

const EventInfoComponent = (props: EventInfoComponentProps) => {
  const {
    __ui_id__: id,
    data: { location_text, time_text, location_icon, time_icon },
  } = props;

  return (
    <BasicContainer id={id}>
      <Box display={'flex'} flexBasis={'row'} justifyContent={'flex-start'} paddingY={'8px'}>
        <IconButton sx={{ padding: 0, marginRight: '16px' }}>
          <img src={location_icon} alt={'Icon'} style={{ width: 24, height: 24 }} />
        </IconButton>
        <Typography sx={{ fontWeight: 500, fontSize: '1rem', color: '#FFF' }}>{location_text}</Typography>
      </Box>
      <Box display={'flex'} flexBasis={'row'} justifyContent={'flex-start'} paddingY={'8px'}>
        <IconButton sx={{ padding: 0, marginRight: '16px' }}>
          <img src={time_icon} alt={'Icon'} style={{ width: 24, height: 24 }} />
        </IconButton>
        <Typography sx={{ fontWeight: 500, fontSize: '1rem', color: '#FFF' }}>{time_text}</Typography>
      </Box>
    </BasicContainer>
  );
};
export default EventInfoComponent;
