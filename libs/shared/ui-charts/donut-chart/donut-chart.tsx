import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
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
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

const DonutChart = ({ data }) => {
  const totalValue = data.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.value;
  }, 0);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie data={data} dataKey="value" innerRadius="45%" outerRadius="80%" startAngle={90} endAngle={-270} labelLine={false} label={renderCustomLabel}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            fill: '#0D47A1',
          }}
        >
          {totalValue}
        </text>
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: '16px',
            fill: '#0D47A1',
          }}
        >
          Unit
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
