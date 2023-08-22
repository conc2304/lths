import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { format } from 'date-fns';

import { TimeSlotWrapper, TimeSlotWrapperProps } from './index';

describe('TimeSlotWrapper', () => {
  it('renders without crashing', () => {
    const props: TimeSlotWrapperProps = {
      slotTimes: [new Date(), new Date()],
    };
    const { container } = render(<TimeSlotWrapper {...props} />);
    expect(container).toBeInTheDocument();
  });

  it('renders the correct time format when slotTimes are provided', () => {
    const testSlotTimes: [Date, Date] = [new Date(2023, 7, 10, 10, 0), new Date(2023, 7, 10, 10, 30)];
    const dateFormat = 'h:mm a';

    const { getByText } = render(<TimeSlotWrapper slotTimes={testSlotTimes} dateFormat={dateFormat} showHalfPoint />);

    const startTimeText = getByText(format(testSlotTimes[0], dateFormat));
    const halfPointTimeText = getByText(format(testSlotTimes[1], 'h:mm'));

    expect(startTimeText).toBeInTheDocument();
    expect(halfPointTimeText).toBeInTheDocument();
  });

  it('renders without halfway time marker when prop not provided', () => {
    const testSlotTimes: [Date, Date] = [new Date(2023, 7, 10, 10, 0), new Date(2023, 7, 10, 10, 30)]; // Example slot times
    const dateFormat = 'h:mm a'; // Example date format

    const { getByText, queryByText } = render(
      <TimeSlotWrapper slotTimes={testSlotTimes} dateFormat={dateFormat} showHalfPoint={false} />
    );

    const startTimeText = getByText(format(testSlotTimes[0], dateFormat));
    const halfPointTimeText = queryByText(format(testSlotTimes[1], 'h:mm'));

    expect(startTimeText).toBeInTheDocument();
    expect(halfPointTimeText).not.toBeInTheDocument();
    expect(halfPointTimeText).toBeNull();
  });
});
