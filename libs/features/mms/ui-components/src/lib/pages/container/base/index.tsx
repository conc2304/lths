import { ReactNode } from 'react';
import Box from '@mui/system/Box';

import { colors } from '../../../common';

type Props = {
  children?: ReactNode;
  className?: string;
};

const containerStyle = { backgroundColor: colors.container.backgroundColor, padding: 16 };

export const BaseContainer = ({ children, className }: Props) => {
  return (
    <Box style={containerStyle} className={className}>
      {children}
    </Box>
  );
};
