import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import CalendarViewComponent from './index';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';
import { CalendarViewComponentProps } from '../../types';

describe('CalendarViewComponent', () => {
  let props: CalendarViewComponentProps;

  beforeEach(() => {
    props = {
      ...mockComponentProps,
      __ui_id__: '3333333',
      component_id: Component.CalendarView,
      data: {
        tab_mode: 'scrollable',
        start_month: '3',
        start_year: '2001',
        end_month: '5',
        end_year: '2001',
        selected_month: '4',
        selected_year: '2001',
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with correct tabs', () => {
    render(<CalendarViewComponent {...props} />);

    const monthTabLeftElement = screen.getByText("April");
    expect(monthTabLeftElement).toBeInTheDocument();
    const monthTabMiddleElement = screen.getByText("May");
    expect(monthTabMiddleElement).toBeInTheDocument();
    const monthTabRightElement = screen.getByText("June");
    expect(monthTabRightElement).toBeInTheDocument();
  });

  test('renders component with two tabs', () => {
    props.data.start_month = '4'
    render(<CalendarViewComponent {...props} />);

    const monthTabLeftElement = screen.queryByText("April");
    expect(monthTabLeftElement).not.toBeInTheDocument();
    const monthTabMiddleElement = screen.getByText("May");
    expect(monthTabMiddleElement).toBeInTheDocument();
    const monthTabRightElement = screen.getByText("June");
    expect(monthTabRightElement).toBeInTheDocument();
  });

  test('renders component with one tab', () => {
    props.data.start_month = '4'
    props.data.end_month = '4'
    render(<CalendarViewComponent {...props} />);

    const monthTabLeftElement = screen.queryByText("April");
    expect(monthTabLeftElement).not.toBeInTheDocument();
    const monthTabMiddleElement = screen.getByText("May");
    expect(monthTabMiddleElement).toBeInTheDocument();
    const monthTabRightElement = screen.queryByText("June");
    expect(monthTabRightElement).not.toBeInTheDocument();
  });

});