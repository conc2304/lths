import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Add } from '@mui/icons-material';

export type CustomTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <Box
        sx={{
          backgroundColor: 'white',
          padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
          borderRadius: theme.spacing(1.5),
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
            sx={{ marginLeft: theme.spacing(0.5), color: '#6A6A6B', fontSize: '0.75rem' }}
          >
            {data.trends.duration} days ago
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary
"
            sx={{ marginLeft: theme.spacing(0.5), color: '#6A6A6B', fontSize: '0.75rem' }}
          >
            Median
          </Typography>
        </Box>
      </Box>
    );
  }

  return null;
};

const tickFormatter = (value) => {
  const date = new Date(value);
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return formattedDate;
};

const LineChart = ({ data }) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data} margin={{ top: Number(theme.spacing(1)), right: Number(theme.spacing(3)), left: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="40%" stopColor="#0760A4" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#0760A4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="datetime" tickFormatter={tickFormatter} tickCount={2} />
        <YAxis />
        <CartesianGrid stroke="#D9D9D9" strokeWidth={0.6} strokeDasharray="0" />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="value" stroke="#0760A4" fillOpacity={1} fill="url(#colorValue)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
