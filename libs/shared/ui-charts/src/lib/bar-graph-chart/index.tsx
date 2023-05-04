import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { SxProps } from '@mui/system';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

import { barColors, barLightColors } from '../colors';

const ChartTooltip2 = styled(Box)<SxProps>(() => ({
  padding: '1.2rem',
  background: '#fff',
  outline: 'none !important',
  border: '1px solid #fff !important',
  borderRadius: '8px',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  '.number': {
    color: '#000',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    textAlign: 'left',
  },
  '.text': {
    fontSize: '12px',
    fontWeight: 600,
    color: '#9e9e9e',
  },
  '.container': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  '.container div': {
    marginBottom: '0.5rem',
  },
}));

const data = [
  {
    name: `Duck's Base Fans`,
    impression: 4000,
    clickthrough: 2400,
  },
  {
    name: 'Ticket Holders',
    impression: 3000,
    clickthrough: 1398,
  },
  {
    name: 'Orange Alliance',
    impression: 10000,
    clickthrough: 9000,
  },
];

const CustomizedTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  console.log(payload, 'payload here');
  if (active) {
    return (
      <ChartTooltip2>
        <div>
          <div className="">
            {payload?.length && (
              <span className="number">
                {payload[0]?.payload.impression} <span className="text">IMPRESSIONS</span>
              </span>
            )}
          </div>
          <div className="">
            {payload?.length && (
              <span className="number">
                {payload[0]?.payload.clickthrough} <span className="text">CLICK-THRU</span>
              </span>
            )}
          </div>
          <div className="">
            {payload?.length && (
              <span className="number">
                {payload[0]?.payload.clickthrough} <span className="text">CLICK-THRU</span>
              </span>
            )}
          </div>
        </div>
      </ChartTooltip2>
    );
  }

  return null;
};
export const BarGraph = () => {
  const theme = useTheme();
  return (
    <Box component={'div'} sx={{ width: '100%', marginBottom: `${theme.spacing(4)}` }}>
      <Box component={'div'} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Box
          component="div"
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            marginTop: `${theme.spacing(1)}`,
          }}
        >
          <Typography variant="subtitle1" color="secondary">
            IMPRESSIONS VS CLICK-THROUGHS
          </Typography>
          <Box
            component={'div'}
            sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}
          >
            <Box component={'div'} sx={{ display: 'flex' }}>
              {barColors.map((color) => (
                <Box
                  component={'div'}
                  key={color.startColor}
                  sx={{
                    height: '1.2rem',
                    width: '1.2rem',
                    borderRadius: '0.2rem',
                    background: `linear-gradient(${color.startColor}, ${color.endColor});`,
                    marginRight: '0.2rem',
                  }}
                ></Box>
              ))}
              <Typography variant="subtitle2" sx={{ marginLeft: '0.2rem' }} color={'secondary'}>
                IMPRESSIONS
              </Typography>
            </Box>
            <Box component={'div'} sx={{ display: 'flex', marginLeft: { xs: '1.8rem', sm: '2rem' } }}>
              {barLightColors.map((color) => (
                <Box
                  component={'div'}
                  key={color.startColor}
                  sx={{
                    height: '1.2rem',
                    width: '1.2rem',
                    borderRadius: '0.2rem',
                    background: `linear-gradient(${color.startColor}, ${color.endColor});`,
                    marginRight: '0.2rem',
                  }}
                ></Box>
              ))}
              <Typography variant="subtitle2" sx={{ marginLeft: '0.2rem' }} color={'secondary'}>
                CLICK-THROUGHS
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box component={'div'} sx={{ width: '100%', height: '500px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <defs>
              {barColors.map((color, index) => (
                <linearGradient id={`colorUv${index}`} x1="0" y1="0" x2="100%" y2="0" spreadMethod="reflect">
                  <stop offset="0" stopColor={color.startColor} />
                  <stop offset="1" stopColor={color.endColor} />
                </linearGradient>
              ))}
            </defs>
            <defs>
              {barLightColors.map((color, index) => (
                <linearGradient id={`colorUvLight${index}`} x1="0" y1="0" x2="100%" y2="0" spreadMethod="reflect">
                  <stop offset="0" stopColor={color.startColor} />
                  <stop offset="1" stopColor={color.endColor} />
                </linearGradient>
              ))}
            </defs>

            <Tooltip cursor={false} content={<CustomizedTooltip />} />
            <Bar dataKey="impression" fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#colorUv${index})`} />
              ))}
            </Bar>
            <Bar dataKey="clickthrough" fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#colorUvLight${index})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
