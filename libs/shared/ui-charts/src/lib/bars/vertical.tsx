import React from 'react';
import { Box, useTheme, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

import { barColors } from '../colors';

const ChartTooltip = styled(Box)(() => {
  const theme = useTheme();
  return {
    padding: theme.spacing(2),
    background: theme.palette.background.paper,
    outline: 'none !important',
    border: `1px solid ${theme.palette.primary.main} !important`,
    borderRadius: theme.shape.borderRadius,
  }
});

export type BarData = {
  title: string;
  uv: number;
  in?: number;
  drop?: number;
}

export type VerticalBarChartProps = {
  includeSteps?: boolean;
  data: Array<BarData>
}

export const VerticalBarChart: React.FC<VerticalBarChartProps> = (props) =>  {
  const theme = useTheme();
  const { includeSteps, data } = props;

  const toPercent = (decimal: number) => {
    return `${decimal}%`;
  };

  const CustomizedTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
    
    if (active) {
      return (
        <ChartTooltip>
          <Stack 
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <Typography sx={{fontSize: theme.spacing(1.75), fontWeight: 500}}>
              {payload?.length && <span>{payload[0].value}%</span>}
            </Typography>
            {
              payload?.length && payload[0]?.payload?.in && (
                <Typography sx={{fontSize: theme.spacing(1.5), fontWeight: 500}}>
                  {payload[0].payload.in.toLocaleString()} <span style={{ color: 'green', fontSize: theme.spacing(1.25) }}>IN</span>
                </Typography>
              )
            }
            {
              payload?.length && payload[0]?.payload?.drop && (
                <Typography sx={{fontSize: theme.spacing(1.5), fontWeight: 500}}>
                  {payload[0].payload.drop.toLocaleString()} <Typography display="inline" sx={{ color: 'red', fontSize: theme.spacing(1.25)}}>DROP</Typography>
                </Typography>
              )
            }
          </Stack>
        </ChartTooltip>
      );
    }

    return null;
  };

  function MultipleXaxis() {
    if (includeSteps)
    {
      return (
        <>
          <XAxis
              tickLine={false}
              tick={{ fontSize: theme.spacing(1.5), fill: theme.palette.text.secondary }}
              tickFormatter={(index: number) => `Step ${index+1}`}
              height={15}
              dy={10}
              xAxisId={0}
          /> 
          <XAxis dataKey="title" tick={{ fontSize: theme.spacing(1.75), fill: theme.palette.text.primary, fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} xAxisId={1} />
        </>
        );
    } else {
      return (
        <XAxis dataKey="title" tick={{ fontSize: theme.spacing(1.75), fill: theme.palette.text.primary, fontWeight: 500 }} tickLine={false} dy={10} xAxisId={0} />
      );
    }
  };

  return (
    <Box component={'div'} sx={{ width: '98%' }}>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          width={500}
          height={300}
          data={data}
          stackOffset="expand"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
        <CartesianGrid strokeDasharray="3 3" />
          {MultipleXaxis()}
          <YAxis tickFormatter={toPercent} />
          <defs>
            {barColors.map((color, index) => (
              <linearGradient id={`colorpercent${index}`} x1="0" y1="100%" x2="0" y2="0" spreadMethod="reflect">
                <stop offset="0" stopColor={color.startColor} />
                <stop offset="1" stopColor={color.endColor} />
              </linearGradient>
            ))}
          </defs>
          <Tooltip cursor={false} content={<CustomizedTooltip />} />
          <Bar dataKey="uv">
            {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#colorpercent${index % barColors.length})`} />
              )
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

VerticalBarChart.defaultProps = {
  includeSteps: false,
};