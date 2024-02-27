import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import ScheduleListComponent from '.';
import { Component } from '../../enum';
import { ScheduleListComponentProps } from '../../types';

describe('ScheduleListComponent', () => {
  let props: ScheduleListComponentProps;

  beforeEach(() => {
    props = {
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with default data', () => {
    render(<ScheduleListComponent {...props} />);
  });
});
