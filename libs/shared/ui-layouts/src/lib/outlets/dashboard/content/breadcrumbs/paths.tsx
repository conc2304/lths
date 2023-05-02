import { Fragment } from 'react';

import { BreadcrumbLink } from './link';
import { BreadcrumbPathProps } from './types';

export const BreadcrumbPaths = ({ paths }: { paths: BreadcrumbPathProps[] }) => {
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
