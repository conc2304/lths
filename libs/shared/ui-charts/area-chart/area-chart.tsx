import React from 'react';
import { AreaChart, Area, TooltipProps, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

type CustomTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '12px 16px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" color="primary.main" fontWeight="bold" sx={{ textAlign: 'center' }}>
          {data.value.toLocaleString('en-US')}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <Box display="flex" alignItems="center">
            <ArrowDownwardIcon fontSize="small" style={{ color: '#FF3D57' }} />
            <Typography variant="caption" color="#FF0000" sx={{ marginLeft: '4px', fontSize: '14px' }}>
              {`${data.totalDown}%`}
            </Typography>
          </Box>
          <Box sx={{ width: '1.2px', height: '20px', backgroundColor: '#D9D9D9', marginLeft: '12px', marginRight: '12px' }} />
          <Box display="flex" alignItems="center">
            <Add fontSize="small" style={{ color: '#01A611', fontSize: '16px' }} />
            <Typography variant="caption" color="#01A611" sx={{ marginLeft: '4px', fontSize: '16px' }}>
              {`${data.medianDown}%`}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <Typography variant="caption" color="text.secondary" sx={{ marginLeft: '4px', color: '#6A6A6B', fontSize: '12px' }}>
            Prev 7 days
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ marginLeft: '4px', color: '#6A6A6B', fontSize: '12px' }}>
            Median
          </Typography>
        </Box>
      </Box>
    );
  }

  return null;
};

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="40%" stopColor="#0760A4" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#0760A4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid stroke="#D9D9D9" strokeWidth={0.6} strokeDasharray="0" />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="value" stroke="#0760A4" fillOpacity={1} fill="url(#colorValue)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
