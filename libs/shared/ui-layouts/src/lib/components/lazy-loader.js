import { Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

import { ErrorBoundary } from './error-boundary';
const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
}));

const ProgressBar = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);
const Error = () => {
  return <div>An error has occurred while loading the module. </div>;
};

export const LazyLoader = (Component) => (props) =>
  (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<ProgressBar />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
