import React from 'react';
import { Stack, Link, Paper } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { KpiCard, KpiCardProps } from '../kpi-card/index';

export type KpiSparklineCardProps = KpiCardProps & {
  sparkLine?: React.ReactElement;
};

export const KpiSparklineCard: React.FC<KpiSparklineCardProps> = (props) => {
  const theme = useTheme();
  const { title, hero, heroUnit, trends, tooltipDesc, tooltipActionUrl, sparkLine } = props;

  return (
    <Paper sx={{ position: 'relative', flex: 1 }}>
      <KpiCard title={title} hero={hero} heroUnit={heroUnit} trends={trends} tooltipDesc={tooltipDesc} tooltipActionUrl={tooltipActionUrl} />
      <Stack sx={{ paddingLeft: theme.spacing(2.5), paddingBottom: theme.spacing(2.5) }} spacing={1.5}>
        <div style={{ paddingTop: theme.spacing(1), textAlign: 'center' }}>{sparkLine}</div>
        {tooltipActionUrl && (
          <Link sx={{ fontSize: theme.spacing(1.5) }} href={tooltipActionUrl} underline="none">
            <Stack direction="row" alignItems="center">
              <div>VIEW DETAILS</div>
              <ArrowForward sx={{ marginLeft: theme.spacing(0.5), width: theme.spacing(2), height: theme.spacing(2) }} />
            </Stack>
          </Link>
        )}
      </Stack>
    </Paper>
  );
};

export default KpiSparklineCard;
