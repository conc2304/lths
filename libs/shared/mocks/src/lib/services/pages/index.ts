import Editor from '././editor';
import ComponentDetailPayload from './editor/component-detail';
import Images from './images';
import { MSWPathConf } from '../types';

const generics: MSWPathConf[] = [...Editor];

export const CustomServices = [ComponentDetailPayload, Images];

export default generics;
