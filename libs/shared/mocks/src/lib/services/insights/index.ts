import Onboarding from './flow/onboarding';
import Notifications from './notifications';
import Overview from './overview';
import { MSWPathConf } from '../types';

const generics: MSWPathConf[] = [...Overview, ...Onboarding];
export const CustomServices = [Notifications];

export default generics;
