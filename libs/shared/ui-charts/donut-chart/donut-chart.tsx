import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Grid } from '@mui/material';

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: '14px',
      }}
    >
      {/* this is for the percentage that each section acquire in the donut chart */}
      {/* {(percent * 100).toFixed(0)}% */}
      {value.toLocaleString('en-US')}
    </text>
  );
};

const legendFormatter = (value, entry, index) => {
  const item = entry.payload;
  return <span style={{ color: 'black' }}>{`${item.name} (${item.value.toLocaleString('en-US')})`}</span>;
};

const DonutChart = ({ data }) => {
  const totalValue = data.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.value;
  }, 0);

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius="43%" outerRadius="80%" startAngle={90} endAngle={-270} labelLine={false} label={renderCustomLabel}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
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
              y="40%"
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontSize: '24px',
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
                fontSize: '16px',
                fill: 'black',
              }}
            >
              USERS
            </text>
          </PieChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};

export default DonutChart;
