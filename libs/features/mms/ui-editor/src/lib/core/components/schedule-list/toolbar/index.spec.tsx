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
        allow_infinite_scroll: false,
        update_frequency_in_ms: 15000,
        selected_month: '1',
        selected_year: '2024',
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

    const infiniteScrollSwitch = screen.getByLabelText('Allow infinite scroll') as HTMLInputElement;
    expect(infiniteScrollSwitch).toBeInTheDocument();
    expect(infiniteScrollSwitch.checked).toBeFalsy();
  });
});
