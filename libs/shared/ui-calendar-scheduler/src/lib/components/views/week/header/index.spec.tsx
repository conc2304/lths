import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { HeaderProps, dateFnsLocalizer } from 'react-big-calendar';

import { WeekHeader } from './index';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

describe('WeekHeader', () => {
  it('renders without crashing', () => {
    const props: HeaderProps = {
      label: 'Thu 17',
      localizer,
      date: new Date('August 17, 2023'),
    };
    const { container } = render(<WeekHeader {...props} />);
    expect(container).toBeInTheDocument();
  });

  it('displays the correct label', () => {
    const testLabel = 'TEST LABEL';

    const { getByText } = render(
      <WeekHeader label={testLabel} date={new Date('August 17, 2023')} localizer={localizer} />
    );
    const labelElement = getByText(testLabel);

    expect(labelElement).toBeInTheDocument();
  });
});
