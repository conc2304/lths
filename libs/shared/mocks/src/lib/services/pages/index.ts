import Generic, { Custom } from '././editor';
import Images from './images';
import { MSWPathConf } from '../types';

const generics: MSWPathConf[] = [...Generic];

export const CustomServices = [...Custom, Images];

export default generics;
