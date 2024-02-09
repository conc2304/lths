import React from 'react';
import { Tabs, Tab, Divider } from '@mui/material';
import { differenceInCalendarMonths } from 'date-fns';

import { MOBILE_SCREEN_WIDTH } from '../../../../../common';
import colors from '../../../../../common/colors';
import { MonthAndYear } from '../../../types';
import { getMonthFullName } from '../../utils'

interface TabBarProps {
  selectedMonthAndYear: MonthAndYear;
  startMonthAndYear: MonthAndYear;
  endMonthAndYear: MonthAndYear;
}

const TabBar = (props: TabBarProps) => {
  const {
    selectedMonthAndYear,
    startMonthAndYear,
    endMonthAndYear,
  } = props;

  const isSameMonthAndYear = (month1: MonthAndYear, month2: MonthAndYear) => {
    if(month1.month === month2.month && month1.year === month2.year) return true;
    return false;
  }
  
  const getViewableTabNum = (startMonth: MonthAndYear, endMonth: MonthAndYear) => {
    const startDate = new Date(startMonth.year, startMonth.month)
    const endDate = new Date(endMonth.year, endMonth.month)
    const tabNum = differenceInCalendarMonths(endDate, startDate) + 1;
    return tabNum > 2 ? 3 : tabNum;
  }

  const getMonthTabs = () => {
    const isStartMonth = isSameMonthAndYear(selectedMonthAndYear, startMonthAndYear);
    const isEndMonth = isSameMonthAndYear(selectedMonthAndYear, endMonthAndYear);
    const tabNum = getViewableTabNum(startMonthAndYear, endMonthAndYear);

    let monthTabs;
    if(isStartMonth) {
      monthTabs = Array(tabNum).fill(0).map((x, i)=> i + selectedMonthAndYear.month )
    } else if (isEndMonth) {
      monthTabs = Array(tabNum).fill(0).map((x, i)=> i + selectedMonthAndYear.month - (tabNum - 1) )
    } else {
      monthTabs = [selectedMonthAndYear.month-1, selectedMonthAndYear.month, selectedMonthAndYear.month+1]
    }
    return monthTabs;
  }

  const renderTab = (monthNum: number) => {
    const tabNum = getViewableTabNum(startMonthAndYear, endMonthAndYear);
    const monthName = getMonthFullName(monthNum);

    //    width = (screenWidth - tabContainerPadding - tabsGap) / tabNum;
    const width = (MOBILE_SCREEN_WIDTH - 40 - (24 * (tabNum - 1))) / tabNum;

    return (
      <Tab label={monthName} value={monthName} key={monthName}
        sx={{
          marginX: '12px',
          width: width,
          fontWeight: 500, fontSize: 14,
          color: colors.editor.subText,
          '&.Mui-selected': {
            color: colors.editor.text,
          },
        }} 
      />
    )
  }

  const monthTabs = getMonthTabs();

  return (
    <Tabs
      value={getMonthFullName(selectedMonthAndYear.month)}
      centered={true}
      TabIndicatorProps={{ 
        children: 
          <Divider
            color={colors.editor.divider}
            sx={{
              height: '3px',
              borderRadius: '100px 200px 0px 0px',
            }}
          /> 
      }}
      sx={{
        paddingX: 2.5,
        backgroundColor: colors.calendar.tabBar.background,
        '& .MuiTabs-indicator': {
          backgroundColor: 'transparent',
        },
      }}
    >
      {monthTabs.map((month)=> 
        renderTab(month)
      )}
    </Tabs>
  );
};

export default TabBar;
