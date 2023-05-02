import { Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

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

export const LazyLoader = (Component) => (props) =>
  (
    <Suspense fallback={<ProgressBar />}>
      <Component {...props} />
    </Suspense>
  );
