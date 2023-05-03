import Components from './components';
import Notifications from './notifications';
import Overview from './overview';
import Pages from './pages';
import { MSWPathConf } from '../types';

const generics: MSWPathConf[] = [...Overview, ...Components, ...Pages];
export const CustomServices = [Notifications];

export default generics;
