import { ReactNode } from 'react';
import Box from '@mui/system/Box';

import { colors } from '../../../common';

type Props = {
  children?: ReactNode;
};

const containerStyle = { backgroundColor: colors.container.backgroundColor, padding: 16 };

export const BaseContainer = ({ children }: Props) => {
  return <Box style={containerStyle}>{children}</Box>;
};
