import { forwardRef, ReactElement, Ref } from 'react';
import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});
export default Transition;
