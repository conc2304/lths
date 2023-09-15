import { Typography, TypographyProps } from '@mui/material';

import { Colors } from '../../../../common';

const GroupLabel = ({ children, ...rest }: TypographyProps) => {
  return (
    <Typography fontWeight={500} fontSize="0.875rem" color={Colors.heading.color} {...rest}>
      {children}
    </Typography>
  );
};

export default GroupLabel;
