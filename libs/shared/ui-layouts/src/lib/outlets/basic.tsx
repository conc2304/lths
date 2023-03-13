import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const BasicLayout = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Outlet />
    </Box>
  );
};

export default BasicLayout;
