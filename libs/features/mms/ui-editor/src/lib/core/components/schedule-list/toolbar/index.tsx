import React, { ChangeEvent } from 'react';
import { FormControl, InputLabel } from '@mui/material';

import { ToolbarLabel, GroupLabel, SwitchButton } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { MonthDropDownToolbar, YearDropDownToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { ScheduleListComponentProps } from '../../types';

const ScheduleListToolbar = (props: ScheduleListComponentProps) => {
  const {
    __ui_id__: id,
    data: { selected_month, selected_year, allow_infinite_scroll },
  } = props;

  const noOfYears = 3; //No of years to populate in the dropdown

  const { handlePropChange } = useToolbarChange();

  const handleInfiniteScrollChange = (event: ChangeEvent<HTMLInputElement>) => {
    handlePropChange('allow_infinite_scroll', event.target.checked);
  };
  const handleScheduleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePropChange('selected_month', event.target.value);
  };

  const handleScheduleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePropChange('selected_year', event.target.value);
  };

  return (
    <ToolContainer id={id} aria-label={'Schedule List Toolbar'}>
      <ToolbarLabel label={'Event List'} />
      <SwitchButton
        isChecked={allow_infinite_scroll || false}
        onChange={handleInfiniteScrollChange}
        label="Allow infinite scroll"
      />
      <GroupLabel label={'Schedule'} />
      <FormControl fullWidth>
        <InputLabel sx={{ color: 'gray' }}>Month</InputLabel>
        <MonthDropDownToolbar value={selected_month} onChange={handleScheduleMonthChange} />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel sx={{ color: 'gray' }}>Year</InputLabel>
        <YearDropDownToolbar noOfYears={noOfYears} value={selected_year} onChange={handleScheduleYearChange} />
      </FormControl>
    </ToolContainer>
  );
};
export default ScheduleListToolbar;
