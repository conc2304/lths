import { ThemeProvider, createTheme } from '@mui/material';
import { render, fireEvent } from '@testing-library/react';
import { Event } from 'react-big-calendar';

import { BaseRowBuilder, RowBuilderFn } from '@lths/shared/ui-elements';

import { LTHSCalendar, LTHSCalendarProps } from './calendar';
import { DEFAULT_LIST_VIEW_COL_HEADER } from '../../constants';
import { EventComponentProps, ToolbarHeaderProps } from '../../types';
import { getNewEvent } from '../mock-events';
import { BaseColumnValue } from '../views/list-view/column-to-event-prop';

describe('LTHSCalendar', () => {
  const props: LTHSCalendarProps = {
    rowBuilder: BaseRowBuilder as RowBuilderFn<Event>,
    headerCells: DEFAULT_LIST_VIEW_COL_HEADER,
    headerToEventValueMap: BaseColumnValue,
    events: Array.from(
      {
        length: 10,
      },
      () => getNewEvent({})
    ),
  };

  const renderComponent = (props: LTHSCalendarProps) => {
    const theme = createTheme();
    return render(
      <ThemeProvider theme={theme}>
        <LTHSCalendar {...props} />
      </ThemeProvider>
    );
  };

  it('renders without crashing', () => {
    const { container } = renderComponent(props);
    expect(container).toBeInTheDocument();
  });

  it('calls onSetView when view is changed', () => {
    const onSetView = jest.fn();
    const { getByText } = renderComponent({ ...props, onSetView });
    fireEvent.click(getByText('Week'));
    expect(onSetView).toHaveBeenCalled();
  });

  it('calls onSetViewMode when view is changed', () => {
    const onSetViewMode = jest.fn();
    const { getByTestId } = renderComponent({ ...props, onSetViewMode });
    fireEvent.click(getByTestId('Calendar-View-Control--view-type-list'));
    expect(onSetViewMode).toHaveBeenCalled();
  });

  it('calls onNavigate when view is changed', () => {
    const onNavigate = jest.fn();
    const { getByText } = renderComponent({ ...props, onNavigate });

    fireEvent.click(getByText('Today'));
    expect(onNavigate).toHaveBeenCalled();
  });

  it('renders custom footer component', () => {
    const CustomFooter = <div data-testid="custom-footer">Custom Footer</div>;
    const { getByTestId } = renderComponent({ ...props, customComponents: { footer: CustomFooter } });
    expect(getByTestId('custom-footer')).toBeInTheDocument();
  });

  it('renders custom toolbar component', () => {
    const CustomToolbar = (props: ToolbarHeaderProps) => <div data-testid="custom-toolbar">{props.label}</div>;
    const { getByTestId } = renderComponent({ ...props, customComponents: { toolbar: CustomToolbar } });
    expect(getByTestId('custom-toolbar')).toBeInTheDocument();
  });

  it('renders custom event item', () => {
    const CustomEvent = (props: EventComponentProps) => <div data-testid="custom-event">{props.title}</div>;
    const testEvent = getNewEvent({ isToday: true });
    const { getAllByTestId, getByText } = renderComponent({
      ...props,
      events: [testEvent],
      customComponents: { eventItem: CustomEvent },
    });
    expect(getAllByTestId('custom-event').length).toBe(1);
    expect(getByText(testEvent.title as string)).toBeInTheDocument();
  });
});
