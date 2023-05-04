// PageLoader.js

import { lazy } from 'react';
import { LazyLoader } from '@lths/shared/ui-layouts';

/*
it is not possible to use a fully dynamic import statement, such as const yourPagePath='';import(yourPagePath). 
Because yourPagePath could potentially be any path to any file in your system or project.

The import() must contain at least some information about where the module is located. 
Bundling can be limited to a specific directory or set of files so that when you are using
 a dynamic expression - every module that could potentially be requested on an import() call is included. 
 For example, import(`./pages/${insight}`) will cause every file in the ./pages directory to be bundled into the new chunk. 
 At run time, when the variable language has been computed, any file like insight.js or insight.tsx will
  be available for consumption.

*/
export const PageLoader = ({ path }) => {
  //DO NOT create a page pref variable here, current webpack doesn't support full dynamic paths.
  const Page = LazyLoader(lazy(() => import(`../pages${path}`)));
  return <Page />;
};
