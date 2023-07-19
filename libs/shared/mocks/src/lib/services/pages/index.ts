import Generic, { Custom } from '././editor';
import Images from './images';
import DefaultPages from './pages/default-pages';
import { MSWPathConf } from '../types';

const generics: MSWPathConf[] = [...Generic];

export const CustomServices = [...Custom, Images, DefaultPages];

export default generics;
