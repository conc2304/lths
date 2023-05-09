import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { KpiCard } from '../kpi-card/index';
import { KpiCardProps, TrendProps } from '../kpi-card/index';

export type KpiRolloverCardProps = KpiCardProps & {
  sparkLine: React.ReactElement;
  rolloverData: TrendProps[];
  rolloverTitle: string;
};

export const KpiRolloverCard: React.FC<KpiRolloverCardProps> = (props) => {
  const theme = useTheme();
  const { title, hero, heroUnit, trends, tooltip, sparkLine, rolloverData, rolloverTitle } = props;

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Paper
      sx={{
        position: 'relative',
        marginBottom: '48px',
        borderBottomLeftRadius: theme.spacing(0),
        borderBottomRightRadius: theme.spacing(0),
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.15)',
      }}
    >
      <KpiCard title={title} hero={hero} heroUnit={heroUnit} trends={trends} tooltip={tooltip} />
      <Accordion
        disableGutters
        sx={{
          width: '100%',
          transform: 'rotate(180deg)',
          zIndex: expanded ? 2 : 1,
          position: 'absolute',
          borderBottomLeftRadius: theme.spacing(0),
          borderBottomRightRadius: theme.spacing(0),
          '&:before': { display: 'none' },
          boxShadow:
            '-2px -2px 4px -2.5px rgba(0,0,0,0.15), 2px -2px 4px -2.5px rgba(0,0,0,0.15), 0px -3.5px 4px -1.5px rgba(0,0,0,0.15)',
        }}
        square={true}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel-header"
          sx={{ transform: 'rotate(180deg)', height: theme.spacing(6), paddingRight: theme.spacing(1) }}
        >
          {sparkLine}
        </AccordionSummary>
        <AccordionDetails
          sx={{ transform: 'rotate(180deg)', padding: theme.spacing(2.5), paddingTop: theme.spacing(2) }}
        >
          <Typography
            sx={{
              fontSize: theme.spacing(1.375),
              paddingBottom: theme.spacing(2.5),
              letterSpacing: theme.spacing(0.01875),
            }}
          >
            {rolloverTitle.toUpperCase()}
          </Typography>
          <Stack spacing={0.5}>
            {rolloverData.map((trendProp) => (
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontSize: theme.spacing(1.375), letterSpacing: theme.spacing(0.01875) }}>
                  {trendProp.span.title}
                </Typography>
                <Typography sx={{ fontSize: theme.spacing(1.375), letterSpacing: theme.spacing(0.01875) }}>
                  {trendProp.span.value}
                  {trendProp.span.unit}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </AccordionDetails>
        <Divider />
      </Accordion>
      <div style={{ height: '4px' }}></div>
    </Paper>
  );
};
