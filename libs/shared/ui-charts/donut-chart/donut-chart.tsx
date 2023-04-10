import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Grid } from '@mui/material';

interface DataItem {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DataItem[];
  width?: string;
  height?: number;
  innerRadius?: string;
  outerRadius?: string;
  startAngle?: number;
  endAngle?: number;
  title?: string;
  labelColor?: string;
}

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }, labelColor) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={labelColor}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: '14px',
      }}
    >
      {value.toLocaleString('en-US')}
    </text>
  );
};

const legendFormatter = (value, entry, index) => {
  const item = entry.payload;
  return <span style={{ color: 'black' }}>{`${item.name} (${item.value.toLocaleString('en-US')})`}</span>;
};

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  width = '100%',
  height = 400,
  innerRadius = '43%',
  outerRadius = '80%',
  startAngle = 90,
  endAngle = -270,
  title = 'USERS',
  labelColor = '#fff',
}) => {
  const totalValue = data.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.value;
  }, 0);

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <ResponsiveContainer width={width} height={height}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              labelLine={false}
              label={(props) => renderCustomLabel(props, labelColor)}
            >
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
              {title}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};

export default DonutChart;
