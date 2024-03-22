import React from 'react';
import { BugReport } from '@mui/icons-material';
import { render } from '@testing-library/react';

import { OverviewTile } from './overview-tile';

describe('OverviewTile', () => {
  it('renders title, metrics, and icon correctly', () => {
    const props = {
      title: 'Overview',
      metrics: {
        Metric1: 100,
        Metric2: 'Some string',
      },
      icon: BugReport,
      tileColor: '#ff0000',
    };

    const { getByText } = render(<OverviewTile {...props} />);

    expect(getByText('Overview')).toBeInTheDocument();

    expect(getByText('Metric1')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
    expect(getByText('Metric2')).toBeInTheDocument();
    expect(getByText('Some string')).toBeInTheDocument();

    // Check if the icon is rendered correctly
    const iconElement = document.querySelector('svg');
    expect(iconElement).toBeInTheDocument();
  });
});
