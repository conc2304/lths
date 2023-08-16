import { Typography, Stack, Button } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { PhoneInquiryComponentProps } from '../../types';

export default function PhoneInquiryComponent(props: PhoneInquiryComponentProps) {
  const {
    __ui_id__: id,
    properties_data: { title, desc, linkcolor, action },
  } = props;
  const handleClick = () => {
    window.open(action.page_link, '_blank');
  };
  return (
    <BasicContainer id={id}>
      <Stack flexDirection={'column'} justifyContent={'flex-start'} alignItems="flex-start" spacing={0.5}>
        <Typography sx={{ fontWeight: 600, wordWrap: 'break-word' }}>{title}</Typography>
        <Button variant="text" onClick={handleClick}>
          <Typography
            variant="body2"
            color={linkcolor}
            style={{
              paddingTop: 12,
            }}
          >
            {desc}
          </Typography>
        </Button>
      </Stack>
    </BasicContainer>
  );
}
