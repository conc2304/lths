import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { addDays } from 'date-fns';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { HeaderProps, dateFnsLocalizer } from 'react-big-calendar';

import { MonthHeader } from './index';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

const props: HeaderProps = {
  label: 'August 2023',
  date: new Date(2023, 7, 1),
  localizer,
};

describe('MonthHeader', () => {
  it('renders without crashing', () => {
    const { container } = render(<MonthHeader {...props} />);
    expect(container).toBeInTheDocument();
  });

  it('displays the correct label', () => {
    const testLabel = 'September 2023';

    const { getByText } = render(<MonthHeader {...props} label={testLabel} date={new Date(2023, 8, 1)} />);
    const labelElement = getByText(testLabel);

    expect(labelElement).toBeInTheDocument();
  });

  it('renders CircleIcon when date is today', () => {
    const currentDate = new Date();

    const { getByTestId } = render(<MonthHeader {...props} date={currentDate} />);

    const circleIcon = getByTestId('Calendar-view-header--today-marker');
    expect(circleIcon).toBeInTheDocument();
  });

  it('does not render CircleIcon when date is not today', () => {
    const notToday = addDays(new Date(), 5);

    const { queryByTestId } = render(<MonthHeader {...props} date={notToday} />);

    const circleIcon = queryByTestId('Calendar-view-header--today-marker');
    expect(circleIcon).toBeNull();
  });
});
