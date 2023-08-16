import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';

import theme from './theme';

type Props = {
  children?: ReactNode;
};

const containerStyle = { fontStyle: 'italic', color: theme.container.color, fontWeight: '400' };

export const InfoContainer = ({ children }: Props) => {
  return <Typography style={containerStyle}>{children}</Typography>;
};
