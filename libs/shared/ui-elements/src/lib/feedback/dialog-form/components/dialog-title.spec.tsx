import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { DialogTitle } from './dialog-title';

describe('DialogTitle component', () => {
  const onCloseMock = jest.fn();

  it('renders the title correctly', () => {
    render(<DialogTitle title="Dialog Title" onClose={onCloseMock} />);

    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
  });

  it('renders the subtitle correctly', () => {
    render(<DialogTitle title="Dialog Title" subtitle="Dialog Subtitle" onClose={onCloseMock} />);

    expect(screen.getByText('Dialog Subtitle')).toBeInTheDocument();
  });

  it('calls onClose when clicking on the CloseButton component', () => {
    render(<DialogTitle title="Dialog Title" onClose={onCloseMock} />);

    const closeBtn = screen.getByTestId('Close-Button--root');
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
