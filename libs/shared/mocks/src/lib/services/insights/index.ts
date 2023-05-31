import Components from './components';
import Onboarding from './flow/onboarding';
import Notifications from './notifications';
import Overview from './overview';
import Pages from './pages';
import Filters from '../filters';
import { MSWPathConf } from '../types';

const generics: MSWPathConf[] = [...Overview, ...Onboarding, ...Components, ...Pages, ...Filters];
export const CustomServices = [Notifications];

export default generics;
