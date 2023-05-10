import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';

import { Colors } from '../../../../common';

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  //padding: theme.spacing(2),
  padding: 0,
  margin: 0,
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  backgroundColor: Colors.sidebar.background,
}));

export default AccordionDetails;
