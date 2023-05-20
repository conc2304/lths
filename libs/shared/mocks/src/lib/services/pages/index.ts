import Generic, { Custom } from '././editor';
import Images from './images';
import Pages from './pages';
import { MSWPathConf } from '../types';

const generics: MSWPathConf[] = [...Generic];

export const CustomServices = [...Custom, Images, Pages];

export default generics;
