import { Typography, Box } from '@mui/material';
import { UiFilters } from '@lths/shared/ui-filters';
import { FilterFormStateProvider } from '@lths/shared/ui-filters';

import { ButtonGroupConf } from '../fixtures/date-button-group-schema';
import { Schema } from '../fixtures/filter-schema';

const DesignSystem = (): JSX.Element => {
  return (
    <Box title="MMS Design System" width={'100%'}>
      <Typography variant="h1" textAlign={'center'}>
        MMS Design System!
      </Typography>

      <FilterFormStateProvider>
        <UiFilters
          dateOptions={ButtonGroupConf}
          formSchema={Schema.payload.data}
          handleApplyFilter={() => console.log(' MAKE FETCH REQUEST THAT WILL RELOAD ANALYTICS DATA')}
        />
      </FilterFormStateProvider>
    </Box>
  );
};

export default DesignSystem;
