import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { TimeGutterWrapper, TimeGutterWrapperProps } from './index';
describe('TimeGutterWrapper', () => {
  it('renders without crashing', () => {
    const props: TimeGutterWrapperProps = {
      slotMetrics: {
        groups: [
          [new Date(2023, 7, 10, 9, 0), new Date(2023, 7, 10, 9, 30)],
          [new Date(2023, 7, 10, 10, 0), new Date(2023, 7, 10, 10, 30)],
        ],
      },
      gutterWidth: '60px',
      slotHeight: '50px',
    };
    const { container } = render(<TimeGutterWrapper {...props} />);
    expect(container).toBeInTheDocument();
  });
});
