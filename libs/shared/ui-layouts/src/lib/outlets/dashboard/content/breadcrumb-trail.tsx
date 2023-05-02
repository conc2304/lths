import { Fragment } from 'react';
import { Typography, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { BreadcrumbPathProps } from './types';
const BreadcrumbTitle = ({ title }: { title: string }) => {
  return (
    <Typography variant="h6" color="textSecondary" aria-label={'title'}>
      {title}
    </Typography>
  );
};

const BreadcrumbLink = ({ title, path }: BreadcrumbPathProps) => {
  return (
    <Link href={path} underline="none" aria-label={`Navigate to ${title}`}>
      <BreadcrumbTitle title={title} />
    </Link>
  );
};
const BreadcrumbPaths = ({ paths }: { paths: BreadcrumbPathProps[] }) => {
  return (
    <>
      {paths.slice(0, -1).map((props, index) => (
        <Fragment key={`breadcrumb_path_${index}`}>
          <BreadcrumbLink {...props} />
        </Fragment>
      ))}
    </>
  );
};
export const BreadcrumbTrail = ({ paths }: { paths: BreadcrumbPathProps[] }) => {
  console.log('🚀 ~ file: breadcrumb-trail.tsx:30 ~ BreadcrumbTrail ~ paths:', paths);
  return (
    <Breadcrumbs
      separator="/"
      aria-label="breadcrumb"
      sx={{
        marginRight: '0rem',
        '& .MuiBreadcrumbs-separator': { marginRight: '.2rem', marginLeft: '.2rem' },
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
