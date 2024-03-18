import React from 'react';
import { Box, Chip } from '@mui/material';
import { clamp, isWithinInterval, addMonths, getMonth, getYear } from 'date-fns';

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

  // format input values
  const selectedValue = (selected_month === '' || selected_year === '') ? null : { month: Number(selected_month)-1, year: Number(selected_year)};
  const startValue = { month: Number(start_month)-1, year: Number(start_year)};
  const endValue = { month: Number(end_month)-1, year: Number(end_year)};
  
  // get min max dates
  const selectedDate = selectedValue && new Date(Number(selectedValue.year), Number(selectedValue.month));
  const startDate = new Date(Number(startValue.year), Number(startValue.month));
  const endDate = new Date(Number(endValue.year), Number(endValue.month));

  const selectedMin = startDate;
  const selectedMax = endDate;

  const endMin = selectedDate || startDate;
  const endMax = addMonths(startDate, 11);

  const handleMonthYearChange = (monthKey: string, yearKey: string, value: MonthAndYear | null) => {
    const month = value ? (value.month + 1).toString() : '';
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

  const handleStartMonthYearChange = (value: MonthAndYear | null) => {
    if(!value) return;
    const newStartDate = new Date(Number(value.year), Number(value.month));

    const newEndDate = clamp(endDate, {
      start: newStartDate,
      end: addMonths(newStartDate, 11),
    })

    const isSelectedValid = isWithinInterval(selectedDate, {
      start: newStartDate,
      end: newEndDate,
    })

    const data = {
      ...props,
      data: {
        ...props.data,
        start_month: (getMonth(newStartDate)+1).toString(),
        start_year: getYear(newStartDate).toString(),
        end_month: (getMonth(newEndDate)+1).toString(),
        end_year: getYear(newEndDate).toString(),
        ...(!isSelectedValid && {
          selected_month: '',
          selected_year: '',
        })
      },
    };
    updateComponent(data);
  };

  return (
    <ToolContainer id={id} aria-label={'Calendar View Toolbar'}>
      <ToolbarLabel label={'Calendar'}/>
      <GroupLabel label={"Range"} />
      <MonthYearPicker
        label={"Start"}
        value={startValue}
        onChange={handleStartMonthYearChange}
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
