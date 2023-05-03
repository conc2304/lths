import { useCallback } from 'react';
import { Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { BreadcrumbLink } from './link';
import { BreadcrumbTitle } from './title';
import { BreadcrumbPathProps } from './types';

const BreadcrumbTrail = ({ paths }: { paths: BreadcrumbPathProps[] }) => {
  const renderInactivePaths = useCallback((paths: BreadcrumbPathProps[]) => {
    return paths.length > 1 && paths.slice(0, -1).map((props) => <BreadcrumbLink {...props} />);
  }, []);
  const renderActivePath = useCallback((paths: BreadcrumbPathProps[]) => {
    return paths.length > 0 && <BreadcrumbTitle title={paths[paths.length - 1].title} />;
  }, []);
  return (
    <Breadcrumbs
      separator="/"
      aria-label="breadcrumb"
      sx={{
        marginRight: '0rem',
        '& .MuiBreadcrumbs-separator': { marginRight: '.3rem', marginLeft: '.3rem' },
      }}
    >
      <Link href={'/'} underline="none" aria-label={`Navigate to Home`} color={'inherit'}>
        <HomeIcon sx={{ padding: '0', margin: 0 }} />
      </Link>

      {renderInactivePaths(paths)}
      {renderActivePath(paths)}
    </Breadcrumbs>
  );
};
export default BreadcrumbTrail;
