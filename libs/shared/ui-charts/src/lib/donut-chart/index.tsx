import React from 'react';
import { Grid, Box, styled } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

import { colors } from '../colors';

const CustomText = styled('text')({
  fontSize: '0.875rem',
});

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <CustomText
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      sx={{
        fontSize: (theme) => theme.spacing(1.5),
      }}
    >
      {value.toLocaleString('en-US')}
    </CustomText>
  );
};

const legendFormatter = (value, entry) => {
  const item = entry.payload;
  console.log(item.title);
  return <Box component="span" sx={{ color: 'black' }}>{`${item.title} (${item.value.toLocaleString('en-US')})`}</Box>;
};
const randomlyGeneratedColors = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

type DonutChartProps = {
  data: {
    title: string | null;
    description?: string | null;
    subtitle?: string | null;
    data: Array<{ title: string; value: string | number }>;
  };
};

export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const totalValue = data.data.reduce((accumulator, currentValue) => {
    return accumulator + Number(currentValue.value);
  }, 0);

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data.data}
              dataKey="value"
              innerRadius="43%"
              outerRadius="80%"
              startAngle={90}
              endAngle={-270}
              labelLine={false}
              label={renderCustomLabel}
            >
              {data.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={randomlyGeneratedColors()} />
              ))}
            </Pie>
            <Legend
              layout="vertical"
              align="center"
              verticalAlign="bottom"
              height={30}
              iconType="square"
              iconSize={16}
              wrapperStyle={{ lineHeight: '40px' }}
              formatter={legendFormatter}
            />
            <text
              x="50%"
              y="40%"
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                fill: 'black',
              }}
            >
              {totalValue.toLocaleString('en-US')}
            </text>
            <text
              x="50%"
              y="48%"
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontSize: '1rem',
                fill: 'black',
              }}
            >
              {data.title?.toUpperCase()}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};

export default DonutChart;
