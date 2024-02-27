import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

import { BreadcrumbTitle } from './title';
import { BreadcrumbPathProps } from './types';

export const BreadcrumbLink = ({ title, path, children }: BreadcrumbPathProps) => {
  return (
    <Link
      component={RouterLink}
      to={path}
      sx={{ cursor: 'pointer' }}
      role="link"
      color="inherit"
      underline="none"
      aria-label={`Navigate to ${title}`}
    >
      {!!children && children}
      {!children && !!title && <BreadcrumbTitle title={title} />}
    </Link>
  );
};
