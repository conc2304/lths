import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';

import { colors } from '../../../common';

type Props = {
  children?: ReactNode;
};

const containerStyle = { fontStyle: 'italic', color: colors.container.color, fontWeight: '400' };

export const InfoContainer = ({ children }: Props) => {
  return <Typography style={containerStyle}>{children}</Typography>;
};
