import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Grid, styled } from '@mui/material';

const CustomText = styled('text')({
  fontSize: '0.875rem',
});

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
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

const legendFormatter = (value, entry, index) => {
  const item = entry.payload;
  return <span style={{ color: 'black' }}>{`${item.title} (${item.value.toLocaleString('en-US')})`}</span>;
};
const randomlyGeneratedColors = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const DonutChart = ({ data }) => {
  const totalValue = data.data.reduce((sum, curr) => sum + curr.value, 0);

  return (
    <ResponsiveContainer width={'99%'} height={400}>
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
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          iconType="square"
          iconSize={16}
          wrapperStyle={{ lineHeight: '40px' }}
          formatter={legendFormatter}
        />
        <text
          x="50%"
          y="32%"
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            fill: 'black',
          }}
        >
          {totalValue.toLocaleString('en-US')}
        </text>
        <text
          x="50%"
          y="38%"
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: '.5rem',
            fill: 'black',
          }}
        >
          {data.title?.toUpperCase()}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
