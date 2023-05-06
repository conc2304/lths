import Editor from '././editor';
import ComponentDetailPayload from './editor/component-detail';
import { MSWPathConf } from '../types';
const generics: MSWPathConf[] = [...Editor];
export const CustomServices = [ComponentDetailPayload];
export default generics;
