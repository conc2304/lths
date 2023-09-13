import { Stack, Typography } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { EventInfoComponentProps } from '../../types';

const EventInfoComponent = (props: EventInfoComponentProps) => {
  const {
    __ui_id__: id,
    data: {
      title,
      desc,
      date_lbl_txt,
      date_lbl_txt_color,
      date_data_txt,
      date_data_txt_color,
      location_lbl_txt,
      location_lbl_txt_color,
      location_data_txt,
      location_data_txt_color,
    },
  } = props;

  return (
    <BasicContainer id={id}>
      <Stack flexDirection={'column'} justifyContent={'flex-start'} alignItems="flex-start" spacing={0.5}>
        <Typography sx={{ fontSize: 32, fontWeight: 600, wordWrap: 'break-word' }}>{title}</Typography>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
          <Typography sx={{ fontWeight: 600, fontSize: 14, color: date_lbl_txt_color }}>
            {date_lbl_txt.toUpperCase()}
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: date_data_txt_color }}>{date_data_txt}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
          <Typography sx={{ fontWeight: 600, fontSize: 14, color: location_lbl_txt_color }}>
            {location_lbl_txt.toUpperCase()}
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: location_data_txt_color }}>
            {location_data_txt}
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          color="text.primary"
          style={{
            paddingTop: 12,
          }}
        >
          {desc}
        </Typography>
      </Stack>
    </BasicContainer>
  );
};
export default EventInfoComponent;
