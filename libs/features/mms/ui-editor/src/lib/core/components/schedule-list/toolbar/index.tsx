import React, { ChangeEvent } from 'react';
import { FormControl, InputLabel } from '@mui/material';

import { ToolbarLabel, GroupLabel, SwitchButton, OutlinedTextField } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { MonthDropDownToolbar, YearDropDownToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { ScheduleListComponentProps } from '../../types';

const ScheduleListToolbar = (props: ScheduleListComponentProps) => {
  const {
    __ui_id__: id,
    data: {
      selected_month,
      selected_year,
      btn_buy_tickets_txt,
      btn_ingame_txt,
      btn_more_info_txt,
      btn_post_game_txt,
      is_show_ingame_btn_icon,
    },
  } = props;

  const noOfYears = 3; //No of years to populate in the dropdown

  const { handlePropChange } = useToolbarChange();

  const handleShowInGameBtnIcon = (event: ChangeEvent<HTMLInputElement>) => {
    handlePropChange('is_show_ingame_btn_icon', event.target.checked);
  };
  const handleScheduleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePropChange('selected_month', event.target.value);
  };

  const handleScheduleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePropChange('selected_year', event.target.value);
  };

  const handleBuyTicketsTxtBtnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePropChange('btn_buy_tickets_txt', event.target.value);
  };

  const handleInGameTxtBtnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePropChange('btn_ingame_txt', event.target.value);
  };

  const handlePostGameTxtBtnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePropChange('btn_post_game_txt', event.target.value);
  };

  const handleMoreInfoTxtBtnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePropChange('btn_more_info_txt', event.target.value);
  };

  return (
    <ToolContainer id={id} aria-label={'Schedule List Toolbar'}>
      <ToolbarLabel label={'Event List'} />
      <GroupLabel label={'Schedule'} />
      <FormControl fullWidth size="small">
        <InputLabel>Month</InputLabel>
        <MonthDropDownToolbar value={selected_month} onChange={handleScheduleMonthChange} />
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Year</InputLabel>
        <YearDropDownToolbar noOfYears={noOfYears} value={selected_year} onChange={handleScheduleYearChange} />
      </FormControl>
      <OutlinedTextField label={'In-Game button text'} value={btn_ingame_txt} onChange={handleInGameTxtBtnChange} />
      <OutlinedTextField
        label={'Post-Game button text'}
        value={btn_post_game_txt}
        onChange={handlePostGameTxtBtnChange}
      />
      <OutlinedTextField
        label={'Buy tickets button text'}
        value={btn_buy_tickets_txt}
        onChange={handleBuyTicketsTxtBtnChange}
      />
      <OutlinedTextField
        label={'More info button text'}
        value={btn_more_info_txt}
        onChange={handleMoreInfoTxtBtnChange}
      />
      <SwitchButton
        isChecked={is_show_ingame_btn_icon}
        onChange={handleShowInGameBtnIcon}
        label="Show In-Game Button Icon"
      />
    </ToolContainer>
  );
};
export default ScheduleListToolbar;
