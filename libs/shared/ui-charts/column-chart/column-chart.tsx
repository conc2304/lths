import { Box } from '@mui/material';
import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { barColors } from './colors';
import { styled } from '@mui/system';

import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const ChartTooltip = styled(Box)(({ theme }) => ({
  padding: '1rem',
  background: '#fff',
  outline: 'none !important',
  border: '1px solid blue !important',
  borderRadius: '8px',
}));

const ColumnChart = () => {
  const data = [
    {
      name: 'Step 1',
      uv: 100,
    },
    {
      name: 'Step 2',
      uv: 82,
    },
    {
      name: 'Step 3',
      uv: 64,
    },
    {
      name: 'Step 4',
      uv: 43,
    },
  ];
  const toPercent = (decimal: number, fixed = 0) => {
    return `${decimal}%`;
  };
  const CustomizedTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
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
    <Box component={'div'} sx={{ width: '100%', height: '500px' }}>
      <ResponsiveContainer width="100%" height="100%">
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
          <XAxis dataKey="name" />
          <YAxis tickFormatter={toPercent} />
          <defs>
            {barColors.map((color, index) => (
              <linearGradient id={`colorpercent${index}`} x1="0" y1="0" x2="100%" y2="0" spreadMethod="reflect">
                <stop offset="0" stopColor={color.startColor} />
                <stop offset="1" stopColor={color.endColor} />
              </linearGradient>
            ))}
          </defs>
          <Tooltip cursor={false} content={<CustomizedTooltip />} />
          <Bar dataKey="uv">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#colorpercent${index})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ColumnChart;
