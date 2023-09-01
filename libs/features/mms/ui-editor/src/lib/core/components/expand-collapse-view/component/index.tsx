import { useState, SyntheticEvent } from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { orange } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

import { BasicContainer } from '../../../../elements';
import { ExpandCollapseViewComponentProps } from '../../types';

const ExpandCollapseViewComponent = (props: ExpandCollapseViewComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { component_data },
  } = props;

  const theme = useTheme();

  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleAccordionChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <BasicContainer id={id} sx={{ gap: 0, margin: 2, borderRadius: 0 }}>
      {component_data.map(({ title, desc }, index) => {
        const panelId = `panel${index}`;
        return (
          <Accordion
            expanded={expanded === panelId}
            onChange={handleAccordionChange(panelId)}
            key={`ExpandCollapseItem${index}`}
            disableGutters={true}
            sx={{ boxShadow: 0, '&::before': { opacity: '1 !important' } }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                padding: 0,
                '&.Mui-expanded': {
                  color: orange[500],
                  minHeight: 0,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                },
                '& .MuiAccordionSummary-content': {
                  margin: '12px 0',
                },
              }}
            >
              <Typography sx={{ fontWeight: 500, fontSize: 18 }}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ paddingLeft: 0, paddingRight: 0 }}>
              <Typography display="block" sx={{ fontWeight: 400, fontSize: 14 }}>
                {desc}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </BasicContainer>
  );
};

export default ExpandCollapseViewComponent;
