import React from 'react';
import { Abc } from '@mui/icons-material';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import { AllDayBanner } from './all-day-banner';

describe('AllDayBanner', () => {
  it('renders without crashing', () => {
    const { container } = render(<AllDayBanner isInAllDayRow={true} containerWidth={130} text={'NEW EVENT ADDED'} />);
    expect(container).toBeInTheDocument();
  });

  it('shows the text when not in all day row and containerWidth is greater than breakpoint', () => {
    render(<AllDayBanner isInAllDayRow={false} containerWidth={130} text={'Banner Text'} />);
    expect(screen.getByText('Banner Text')).toBeInTheDocument();
  });

  it('shows the icon when not in all day row and containerWidth is less than breakpoint', () => {
    render(<AllDayBanner isInAllDayRow={false} containerWidth={120} />);
    expect(screen.getByTestId('FiberNewIcon')).toBeInTheDocument();
  });

  it('shows the icon when in all day row regardless of container width', () => {
    render(<AllDayBanner isInAllDayRow={true} containerWidth={130} />);
    expect(screen.getByTestId('FiberNewIcon')).toBeInTheDocument();
  });

  it('renders with a provided icon', () => {
    render(<AllDayBanner isInAllDayRow={false} containerWidth={120} icon={Abc} />);
    expect(screen.getByTestId('AbcIcon')).toBeInTheDocument();
  });
});
