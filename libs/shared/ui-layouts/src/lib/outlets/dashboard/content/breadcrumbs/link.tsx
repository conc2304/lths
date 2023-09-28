import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { BreadcrumbTitle } from './title';
import { BreadcrumbPathProps } from './types';

export const BreadcrumbLink = ({ title, path }: BreadcrumbPathProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(path);
  }

  return (
    <Link onClick={onClick} sx={{ cursor: 'pointer' }} role="link" underline="none" aria-label={`Navigate to ${title}`}>
      <BreadcrumbTitle title={title} />
    </Link>
  );
};
