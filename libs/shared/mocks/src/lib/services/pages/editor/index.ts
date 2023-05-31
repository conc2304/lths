import ComponentActions from './component-actions';
import ComponentDetail from './component-detail';
import ComponentsPayload from './components.stub';
import ImagesPayload from './image-library.stub';
import { getSuccessfulResponse } from '../../api';

const responses = [
  getSuccessfulResponse('/pages/components', ComponentsPayload),
  getSuccessfulResponse('/pages/images', ImagesPayload),
];

export default responses;
export const Custom = [ComponentDetail, ComponentActions];
