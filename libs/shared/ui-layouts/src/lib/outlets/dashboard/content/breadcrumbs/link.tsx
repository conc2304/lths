import { Link } from '@mui/material';

import { BreadcrumbTitle } from './title';
import { BreadcrumbPathProps } from './types';
export const BreadcrumbLink = ({ title, path }: BreadcrumbPathProps) => {
  return (
    <Link href={path} underline="none" aria-label={`Navigate to ${title}`}>
      <BreadcrumbTitle title={title} />
    </Link>
  );
};
