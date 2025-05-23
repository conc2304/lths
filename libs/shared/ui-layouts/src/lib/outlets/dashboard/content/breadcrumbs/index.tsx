import { useCallback } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useTheme } from '@mui/material/styles';

import { BreadcrumbLink } from './link';
import { BreadcrumbTitle } from './title';
import { BreadcrumbPathProps, BreadcrumbTrailProps } from './types';

const BreadcrumbTrail = ({ paths, activePageTitle }: BreadcrumbTrailProps) => {
  const theme = useTheme();
  const renderInactivePaths = useCallback((paths: BreadcrumbPathProps[]) => {
    return (
      paths.length > 1 &&
      paths
        .slice(0, -1)
        .filter((o) => o.title) //ignore blank or null titles
        .map((props, index) => <BreadcrumbLink key={`breadcrumb_link_${index}`} {...props} />)
    );
  }, []);

  const renderActivePath = useCallback((paths: BreadcrumbPathProps[], activePageTitle?: string) => {
    return activePageTitle != null ? (
      <BreadcrumbTitle title={activePageTitle} />
    ) : (
      paths.length > 0 && <BreadcrumbTitle title={paths[paths.length - 1].title} />
    );
  }, []);

  return (
    <Breadcrumbs
      separator="/"
      aria-label="breadcrumb"
      sx={{
        marginRight: '0rem',
        '& .MuiBreadcrumbs-separator': { 
          marginRight: '.5rem', marginLeft: '.5rem',
          fontSize: '0.75rem',
        },
      }}
    >
      <BreadcrumbLink path="/" title="Home">
        <HomeIcon sx={{ color: theme.palette.action.active, display: 'block' }} />
      </BreadcrumbLink>

      {renderInactivePaths(paths)}
      {renderActivePath(paths, activePageTitle)}
    </Breadcrumbs>
  );
};
export default BreadcrumbTrail;
