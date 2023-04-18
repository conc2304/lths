import React from 'react';
import { Card, CardContent, Typography, Stack, Divider } from '@mui/material';
import { Add, Remove, ArrowOutward } from '@mui/icons-material';
import { green, red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

import InfoTooltip from '../../../icons/tooltip/info-tooltip/index';

export type TrendDataPointProps = {
  title: string;
  unit: string;
  value: number | string;
  direction: string;
};

export type TrendProps = {
  duration: number | string; // 7
  span: TrendDataPointProps;
  median?: TrendDataPointProps;
};

export type KpiCardProps = {
  title: string;
  hero: number;
  heroUnit?: string;
  trends: TrendProps;
  tooltipDesc?: string;
  tooltipActionUrl?: string;
};

export const KpiCard: React.FC<KpiCardProps> = (props) => {
  const theme = useTheme();
  const { title, hero, heroUnit, trends } = props;

  const heroFormated = hero.toLocaleString();
  const heroUnitStyle =
    heroUnit && heroUnit.length > 1
      ? { paddingLeft: theme.spacing(1), fontSize: theme.spacing(1.75), lineHeight: 2, fontWeight: 'bold' }
      : { fontSize: theme.spacing(6), lineHeight: 1, fontWeight: 500 };

  const DisplayTrendDataPoint = (trendDataPointProps: TrendDataPointProps, useArrow?: boolean) => {
    const { title, unit, value, direction } = trendDataPointProps;
    // TODO: add custum palete theme for increase  and decrease stats
    const increaseColor = green[500]; // "#01A611";
    const decreaseColor = red[500]; //"#FF0000";
    const displayColor = direction === 'up' ? increaseColor : decreaseColor;
    // Todo: end
    const iconStyle = {
      marginLeft: theme.spacing(-0.375),
      marginBottom: theme.spacing(0.25),
      width: theme.spacing(2.25),
      height: theme.spacing(2.25),
      color: displayColor,
    };

    const displayIcon = useArrow ? (
      direction === 'up' ? (
        <ArrowOutward sx={iconStyle} />
      ) : (
        <ArrowOutward sx={{ ...iconStyle, transform: 'rotate(90deg)' }} />
      )
    ) : direction === 'up' ? (
      <Add sx={iconStyle} />
    ) : (
      <Remove sx={iconStyle} />
    );

    return (
      <Stack>
        <Stack direction="row" alignItems="center" spacing={useArrow ? 0.5 : 0}>
          {displayIcon}
          <Typography sx={{ color: displayColor, fontSize: theme.spacing(1.75), letterSpacing: theme.spacing(0.01875) }}>
            {value}
            {unit}
          </Typography>
        </Stack>
        <Typography noWrap={true} sx={{ fontSize: theme.spacing(1.375), color: 'text.secondary', letterSpacing: theme.spacing(0.01875) }}>
          {title}
        </Typography>
      </Stack>
    );
  };

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <InfoTooltip {...props} />
      <CardContent sx={{ paddingRight: theme.spacing(1.25), '&:last-child': { paddingBottom: theme.spacing(2) } }}>
        <Typography
          sx={{ paddingTop: theme.spacing(0.5), paddingLeft: theme.spacing(0.5), fontSize: theme.spacing(1.5), letterSpacing: theme.spacing(0.01875) }}
          variant="body2"
        >
          {title.toUpperCase()}
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1.5} sx={{ paddingTop: theme.spacing(2) }}>
          <Stack direction="row" alignItems="flex-end">
            <Typography sx={{ fontSize: theme.spacing(6), lineHeight: 1, fontStyle: 'Medium', letterSpacing: theme.spacing(0.01875) }}>
              {heroFormated}
            </Typography>
            {heroUnit && <Typography sx={{ ...heroUnitStyle, fontWeight: 500, letterSpacing: theme.spacing(0.01875) }}>{heroUnit.toUpperCase()}</Typography>}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1.125} divider={<Divider orientation="vertical" sx={{ height: theme.spacing(3.75) }} />}>
            {DisplayTrendDataPoint(trends.span, true)}
            {trends.median && DisplayTrendDataPoint(trends.median, false)}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
