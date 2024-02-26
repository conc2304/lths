import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ScheduleListToolbar from '.';
import { EditorProvider } from '../../../../context';
import { Component } from '../../enum';
import { ScheduleListComponentProps } from '../../types';

describe('ScheduleList Toolbar', () => {
  let initialState;
  let component: ScheduleListComponentProps;

  beforeEach(() => {
    component = {
      _id: '123',
      name: 'shedulelist',
      display_order: 1,
      image_url: '',
      variation_id: '123',
      __ui_id__: '12345',
      component_id: Component.ScheduleList,
      data: {
        is_show_ingame_btn_icon: true,
        update_frequency_in_ms: 15000,
        selected_month: '1',
        selected_year: '2024',
        btn_more_info_txt: 'More Info',
        btn_buy_tickets_txt: 'Buy Tickets',
        btn_ingame_txt: 'Real-time',
        btn_post_game_txt: 'Game Recap',
        allow_infinite_scroll: false,
      },
    };

    initialState = {
      components: [],
      selectedComponent: component,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render schedulelist with default props', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <ScheduleListToolbar {...component} />
      </EditorProvider>
    );

    const infiniteScrollSwitch = screen.getByLabelText('Show In-Game Button Icon') as HTMLInputElement;
    expect(infiniteScrollSwitch).toBeInTheDocument();
    expect(infiniteScrollSwitch.checked).toBeTruthy();
  });
});
