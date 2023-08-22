import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { TimeGutterHeader, TimeGutterHeaderProps } from './index';

describe('TimeGutterHeader', () => {
  it('renders without crashing', () => {
    const props: TimeGutterHeaderProps = {
      view: 'week',
      gutterWidth: '50px',
      timeSlotHeight: '30px',
    };

    const { container } = render(<TimeGutterHeader {...props} />);
    expect(container).toBeInTheDocument();
  });

  it('renders as empty when view is "day"', () => {
    const props: TimeGutterHeaderProps = {
      view: 'day',
      gutterWidth: '50px',
      timeSlotHeight: '30px',
    };
    const { getByTestId } = render(<TimeGutterHeader {...props} />);
    const emptyDiv = getByTestId('empty-gutter-header');
    expect(emptyDiv).toBeInTheDocument();
    expect(emptyDiv).toBeEmptyDOMElement();
  });
});
