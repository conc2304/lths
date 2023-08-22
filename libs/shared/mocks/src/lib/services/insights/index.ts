import Components from './components';
import Onboarding from './flow/onboarding';
import Notifications from './notifications';
import Overview from './overview';
import Pages from './pages';
import Assets from '../assets';
import Enums from '../enums';
import Filters from '../filters';
import { MSWPathConf } from '../types';

const generics: MSWPathConf[] = [...Overview, ...Onboarding, ...Components, ...Pages, ...Filters, ...Enums];
export const CustomServices = [Notifications, ...Assets];

export default generics;
