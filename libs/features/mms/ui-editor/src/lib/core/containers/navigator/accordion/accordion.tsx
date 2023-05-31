import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';

import { Colors } from '../../../../common';

//TODO: Pass ({theme})=>({}) when a custom palette is created
export const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: `1px solid ${Colors.sidebar.divider}`,
  boxShadow: 'none',
  background: Colors.sidebar.background,
  '&': { paddingTop: 12 },
  '&:before': {
    display: 'none',
  },

  '&.Mui-expanded': {
    borderBottom: 1,
  },

  borderRadius: 0,
  padding: 0,
  margin: 0,
}));
export default Accordion;
