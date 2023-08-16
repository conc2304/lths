import { ReactNode } from 'react';
import Box from '@mui/system/Box';

import theme from './theme';

type Props = {
  children?: ReactNode;
};

const containerStyle = { backgroundColor: theme.container.backgroundColor, padding: 16 };

export const BaseContainer = ({ children }: Props) => {
  return <Box style={containerStyle}>{children}</Box>;
};
