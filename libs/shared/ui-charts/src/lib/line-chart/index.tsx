import React from 'react';
import { Box, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTheme } from '@mui/material/styles';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export type CustomTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <Box
        sx={{
          backgroundColor: 'white',
          padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
          borderRadius: theme.spacing(1.5),
          marginTop: theme.spacing(1.5),
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" color="primary.main" fontWeight="bold" sx={{ textAlign: 'center' }}>
          {data.value?.toLocaleString('en-US')}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <Box display="flex" alignItems="center">
            <ArrowDownwardIcon fontSize="small" style={{ color: '#FF3D57' }} />
            <Typography variant="caption" color="#FF0000" sx={{ marginLeft: theme.spacing(0.5), fontSize: '1rem' }}>
              {`${data.trends.span.value}%`}
            </Typography>
          </Box>
          <Box
            sx={{
              width: (theme) => theme.spacing(0.3),
              height: (theme) => theme.spacing(5),
              backgroundColor: '#D9D9D9',
              marginLeft: theme.spacing(2),
              marginRight: theme.spacing(2),
            }}
          />
          <Box display="flex" alignItems="center">
            <Add fontSize="small" style={{ color: '#01A611', fontSize: '1.25rem' }} />
            <Typography variant="caption" color="#01A611" sx={{ marginLeft: theme.spacing(0.5), fontSize: '1rem' }}>
              {`${data.trends.median.value}%`}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              marginLeft: theme.spacing(0.5),
              color: '#6A6A6B',
              fontSize: '0.75rem',
            }}
          >
            {data.trends.duration} days ago
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              marginLeft: theme.spacing(0.5),
              color: '#6A6A6B',
              fontSize: '0.75rem',
            }}
          >
            Median
          </Typography>
        </Box>
      </Box>
    );
  }

  return null;
};

const CustomXAxisTick = ({ x, y, payload, eventOptions }) => {
  const date = new Date(payload.value);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fontSize={16} fill="#000">
        {formattedDate}
      </text>
      <text x={0} y={20} dy={14.5} textAnchor="middle" fontSize={16} fill="#055EA3" fontWeight={'bold'}>
        {eventOptions[payload.index].title?.toUpperCase()}
      </text>
    </g>
  );
};

const tickFormatter = ({ value }: any) => {
  const date = new Date(value);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  return formattedDate;
};

export const LineChart = ({ data, eventOptions }) => {
  const theme = useTheme();
  return (
    <ResponsiveContainer width="98%" height={430}>
      <AreaChart
        data={data}
        margin={{
          top: Number(theme.spacing(1)),
          right: Number(theme.spacing(3)),
          left: 0,
        }}
      >
        <XAxis
          dataKey="datetime"
          tickFormatter={tickFormatter}
          tickCount={2}
          tick={(props) => <CustomXAxisTick {...props} eventOptions={eventOptions} />}
        />
        <YAxis />
        <CartesianGrid stroke="#D9D9D9" strokeWidth={0.6} strokeDasharray="0" />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="value" stroke="#0760A4" fillOpacity={1} fill="url(#colorValue)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
