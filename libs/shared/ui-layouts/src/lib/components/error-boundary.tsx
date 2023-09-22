import { Component, ErrorInfo, ReactNode } from 'react';
import { Box } from '@mui/material';

import { ErrorDialog } from './error-dialog';

type ErrorBoundaryProps = {
  fallback?: string | ReactNode;
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static defaultProps = {
    fallback: (
      <>
        <p>
          Oops! Looks like our code tried to score a goal but hit the crossbar. We're coaching it up for the next play.
        </p>
        <p>Try going Back, or back to Home</p>
      </>
    ),
  };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error or perform analytics actions here
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box data-testid="Error-Boundary--root">
          <ErrorDialog data-testid="Error-Boundary--root" message={this.props.fallback} />;
        </Box>
      );
    }

    return this.props.children;
  }
}
