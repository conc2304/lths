import { useEffect } from 'react';
import { Box } from '@mui/material';

import { PageHeader } from '@lths/shared/ui-layouts';

const SchedulePage = () => {
  // Api Calls

  // State

  // Data Fetching Params

  // Initialization
  const init = async () => {
    console.log('init');
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Box
      className="MMS-Schedule-Page--root"
      style={{
        width: '-webkit-fill-available',
      }}
    >
      <PageHeader title="Admin Placeholder" sx={{ mt: '1rem', mb: '3.5rem' }} />
    </Box>
  );
};

export default SchedulePage;
