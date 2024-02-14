import { getMonth, getYear, clamp } from 'date-fns';

import Calendar from './calendar';
import TabBar from './tab-bar';
import { BasicContainer } from '../../../../elements/containers';
import { CalendarViewComponentProps } from '../../types';

const CalendarViewComponent = (props: CalendarViewComponentProps) => {
  const {
    __ui_id__: id,
    data: { 
      start_month, start_year,
      end_month, end_year,
      selected_month, selected_year,
    },
  } = props;

  const startMonthAndYear = { month: Number(start_month)-1, year: Number(start_year) };
  const endMonthAndYear = { month: Number(end_month)-1, year: Number(end_year) };

  let selectedMonthAndYear = { month: Number(selected_month)-1, year: Number(selected_year) };

  if(selected_month === "" || selected_year === "") {
    const result = clamp(new Date(), {
      start: new Date(startMonthAndYear.year, startMonthAndYear.month),
      end: new Date(endMonthAndYear.year, endMonthAndYear.month),
    })
    selectedMonthAndYear = { month: getMonth(result), year: getYear(result) }
  }
  
  return (
    <BasicContainer id={id} sx={{ marginX: 0 }}>
      <TabBar 
        selectedMonthAndYear={selectedMonthAndYear}
        startMonthAndYear={startMonthAndYear}
        endMonthAndYear={endMonthAndYear}
      />
      <Calendar
        month={selectedMonthAndYear.month}
        year={selectedMonthAndYear.year}
      />
    </BasicContainer>
  );
};

export default CalendarViewComponent;
