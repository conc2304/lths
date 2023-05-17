import React from 'react';
import { Box, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { Label, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
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
  };
});

export const VerticalBarChart = () => {
  const theme = useTheme();

  const includeSteps = true;
  const data = [
    {
      title: 'Plan your visit',
      subtitle: 'Step 1',
      in: 10,
      drop: 10,
      uv: 100,
    },
    {
      title: 'Stay connected',
      subtitle: 'Step 2',
      in: 10,
      drop: 10,
      uv: 82,
    },
    {
      title: 'Sign up',
      subtitle: 'Step 3',
      in: 10,
      drop: 10,
      uv: 64,
    },
    {
      title: 'App home',
      subtitle: 'Step 4',
      in: 10,
      drop: 10,
      uv: 59,
    },
  ];

  const toPercent = (decimal: number) => {
    return `${decimal}%`;
  };
  const CustomizedTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
    if (payload?.length) {
      console.log(payload[0]);
      console.log(payload[0].payload);
      console.log(payload[0].value);
    }
    
    if (active) {
      return (
        <ChartTooltip>
          <div>{payload?.length && <span>{payload[0].value}%</span>}</div>
          <div>
            <span>
              1234 <span style={{ color: 'green' }}>in</span>
            </span>
            <div style={{ color: 'red' }}>drop</div>
          </div>
        </ChartTooltip>
      );
    }

    return null;
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
          {includeSteps && <XAxis
            tickLine={false}
            tick={{ fontSize: theme.spacing(1.5), fill: theme.palette.text.secondary }}
            tickFormatter={(index: number) => `Step ${index+1}`}
            height={30}
            xAxisId={0}
          />}
          <XAxis dataKey="title" tick={{ fontSize: theme.spacing(1.75), fill: theme.palette.text.primary, fontWeight: 500 }} axisLine={false} tickLine={false} xAxisId={1} />
          
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
