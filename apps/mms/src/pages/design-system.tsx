import { Typography, Box, Divider } from '@mui/material';
import { DateRangeSelector } from '@lths/shared/ui-elements';
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

      <Typography variant="h3">Inputs</Typography>
      <Typography>Button Group</Typography>

      <DateRangeSelector
        dateOptions={ButtonGroupConf}
        onChange={({ startDate, endDate }) => {
          console.log('date changed', startDate, endDate);
        }}
      />

      <Divider />

      <FilterFormStateProvider>
        <UiFilters
          // TODO  - add date picker to this component in next ticket
          formSchema={Schema.payload.data}
          handleApplyFilter={() => console.log(' MAKE FETCH REQUEST THAT WILL RELOAD ANALYTICS DATA')}
        />
      </FilterFormStateProvider>
    </Box>
  );
};

export default DesignSystem;
