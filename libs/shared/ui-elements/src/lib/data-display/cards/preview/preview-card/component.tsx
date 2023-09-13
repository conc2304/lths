import React from 'react';
import { Typography } from '@mui/material';
import { Add, ArrowOutward, Remove } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { green, grey, red } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

type TrendDataPointProps = {
  unit: string;
  value: number | string;
  direction: string | null;
};

export type PreviewCardProps = {
  title: string;
  hero: string | number;
  span: TrendDataPointProps;
  median: TrendDataPointProps;
};

export const PreviewCard: React.FC<PreviewCardProps> = (props) => {
  const theme = useTheme();
  const { title, hero, span, median } = props;

  const heroFormated = hero.toLocaleString();

  const DisplayTrendDataPoint = (trendDataPointProps: TrendDataPointProps, useArrow?: boolean) => {
    const { unit, value, direction } = trendDataPointProps;
    // TODO: add custum palete theme for increase  and decrease stats
    const increaseColor = green[500]; // "#01A611";
    const decreaseColor = red[500]; //"#FF0000";
    const display = grey[900]; //#212121;
    const displayColor = direction === 'up' ? increaseColor : direction === 'down' ? decreaseColor : display;
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
      ) : direction === 'down' ? (
        <ArrowOutward sx={{ ...iconStyle, transform: 'rotate(90deg)' }} />
      ) : (
        ''
      )
    ) : direction === 'up' ? (
      <Add sx={iconStyle} />
    ) : direction === 'down' ? (
      <Remove sx={iconStyle} />
    ) : (
      ''
    );
    return (
      <Stack>
        <Stack direction="row" alignItems="center" spacing={useArrow ? 0.5 : 0}>
          {displayIcon}
          <Typography sx={{ color: displayColor, fontSize: theme.spacing(2), letterSpacing: theme.spacing(0.01875) }}>
            {value}
            {unit}
          </Typography>
        </Stack>
      </Stack>
    );
  };

  return (
    <Card variant="outlined" sx={{ border: '1px solid #055EA3', borderRadius: 2, boxShadow: 'none' }}>
      <CardHeader
        title={title}
        sx={{ pl: theme.spacing(1), pr: theme.spacing(1), pt: theme.spacing(1), pb: theme.spacing(0) }}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1.5}
        sx={{ pl: theme.spacing(1), pr: theme.spacing(3), pb: theme.spacing(1), pt: theme.spacing(0) }}
      >
        <Stack direction="row">
          <Typography
            sx={{
              fontSize: theme.spacing(2),
              lineHeight: 1,
              letterSpacing: theme.spacing(0.01875),
            }}
          >
            {heroFormated}
          </Typography>
        </Stack>

        {median && DisplayTrendDataPoint(median)}
        {span && DisplayTrendDataPoint(span, true)}
      </Stack>
    </Card>
  );
};

export default PreviewCard;
