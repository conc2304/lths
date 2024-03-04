import { BoxProps } from '@mui/material';

import ToolBox from './box';

const ToolContainer = ({ id, children, ...rest }: BoxProps) => {
  return (
    <ToolBox id={id} {...rest}>
      {children}
    </ToolBox>
  );
};

export default ToolContainer;
