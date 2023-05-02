import { Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { BreadcrumbPaths } from './paths';
import { BreadcrumbTitle } from './title';
import { BreadcrumbPathProps } from './types';

const BreadcrumbTrail = ({ paths }: { paths: BreadcrumbPathProps[] }) => {
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
      {/*NOTE: Breadcrumbs adds empty / if this condition is moved to the componenet*/}
      {paths.length > 1 && <BreadcrumbPaths paths={paths} />}
      {paths.length > 0 && <BreadcrumbTitle title={paths[paths.length - 1].title} />}
    </Breadcrumbs>
  );
};
export default BreadcrumbTrail;
