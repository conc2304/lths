import React from 'react';
import { Box, Chip } from '@mui/material';
import { subMonths, addMonths } from 'date-fns';

import NHLLogo from '../../../../../assets/NHL-logo.svg';
import { ICON_WIDTH, ICON_HEIGHT } from '../../../../common';
import { useEditorActions } from '../../../../context';
import { ToolbarLabel, MonthYearPicker, GroupLabel } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { CalendarViewComponentProps, MonthAndYear, SourceType } from '../../types';

const CalendarViewToolbar = (props: CalendarViewComponentProps) => {
  const {
    __ui_id__: id,
    data: { 
      tab_mode,
      start_month, start_year,
      end_month, end_year,
      selected_month, selected_year,
    },
  } = props;

  const { updateComponent } = useEditorActions();

  const handleMonthYearChange = (monthKey: string, yearKey: string, value: MonthAndYear | null) => {
    const month = value ? value.month.toString() : '';
    const year = value ? value.year.toString() : '';

    const data = {
      ...props,
      data: {
        ...props.data,
        [monthKey]: month,
        [yearKey]: year,
      },
    };
    updateComponent(data);
  };

  // format input values
  const selectedValue = (selected_month === '' || selected_year === '') ? null : { month: Number(selected_month), year: Number(selected_year)};
  const startValue = { month: Number(start_month), year: Number(start_year)};
  const endValue = { month: Number(end_month), year: Number(end_year)};
  
  // get min max dates
  const selectedDate = selectedValue && new Date(Number(selectedValue.year), Number(selectedValue.month));
  const startDate = new Date(Number(startValue.year), Number(startValue.month));
  const endDate = new Date(Number(endValue.year), Number(endValue.month));

  const selectedMin = startDate;
  const selectedMax = endDate;

  const startMin = subMonths(endDate, 11);
  const startMax = selectedDate || endDate;

  const endMin = selectedDate || startDate;
  const endMax = addMonths(startDate, 11);

  return (
    <ToolContainer id={id} aria-label={'Calendar View Toolbar'}>
      <ToolbarLabel label={'Calendar'}/>
      <GroupLabel label={"Range"} />
      <MonthYearPicker
        label={"Start"}
        value={startValue}
        maxDate={startMax}
        minDate={startMin}
        onChange={(value) => handleMonthYearChange('start_month', 'start_year', value)}
      />
      <MonthYearPicker
        label={"End"}
        value={endValue}
        maxDate={endMax}
        minDate={endMin}
        onChange={(value) => handleMonthYearChange('end_month', 'end_year', value)}
      />
      <GroupLabel label={"Selected"} />
      <MonthYearPicker
        label={"Selected"}
        value={selectedValue}
        maxDate={selectedMax}
        minDate={selectedMin}
        clearable={true}
        onChange={(value) => handleMonthYearChange('selected_month', 'selected_year', value)}
      />
      <GroupLabel label={"Tab Mode: " + tab_mode} />
      <GroupLabel label="Source Type" />
      <Box>
        <Chip
          label={SourceType.NHL_SCHEDULE}
          variant="filled"
          icon={<img src={NHLLogo} alt="NHL Logo" width={ICON_WIDTH} height={ICON_HEIGHT} />}
          sx={{
            '& .MuiChip-label': { textTransform: 'none' },
          }}
        />
      </Box>
    </ToolContainer>
  );
};
export default CalendarViewToolbar;
