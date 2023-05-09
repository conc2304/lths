import React from 'react';
import { Stack, Link, Paper, PaperProps } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';

import { KpiCard, KpiCardProps } from '../kpi-card/index';

export type KpiSparklineCardProps = KpiCardProps & {
  sparkLine?: React.ReactElement;
};

const FullWidthPaper = styled(Paper)<PaperProps>(() => ({
  position: 'relative',
  flex: 1,
}));
//todo: move tooltip props to info/tootip object
export const KpiSparklineCard: React.FC<KpiSparklineCardProps> = (props) => {
  const theme = useTheme();
  const { title, hero, heroUnit, trends, tooltip, sparkLine, detail } = props;

  return (
    <FullWidthPaper>
      <KpiCard title={title} hero={hero} heroUnit={heroUnit} trends={trends} tooltip={tooltip} />
      <Stack sx={{ paddingLeft: theme.spacing(2.5), paddingBottom: theme.spacing(2.5) }} spacing={1.5}>
        <div style={{ paddingTop: theme.spacing(1), textAlign: 'center' }}>{sparkLine}</div>
        {detail && (
          <Link sx={{ fontSize: theme.spacing(1.5) }} href={detail.url} underline="none">
            <Stack direction="row" alignItems="center">
              <div>VIEW DETAILS</div>
              <ArrowForward
                sx={{ marginLeft: theme.spacing(0.5), width: theme.spacing(2), height: theme.spacing(2) }}
              />
            </Stack>
          </Link>
        )}
      </Stack>
    </FullWidthPaper>
  );
};
