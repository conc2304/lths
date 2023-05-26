import { Typography, Box } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { PhoneInquiryComponentProps } from '../../types';

export default function PhoneInquiryComponent(props: PhoneInquiryComponentProps) {
  const {
    __ui_id__: id,
    default_data: { title, desc, linkcolor },
  } = props;

  return (
    <BasicContainer id={id}>
      <Box>
        <Typography >{title}</Typography>
      </Box>
      <Box>
        <Typography sx={{ color: linkcolor }}>{desc}</Typography>
      </Box>
    </BasicContainer>
  );
}
