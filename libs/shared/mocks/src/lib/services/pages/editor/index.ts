import ComponentActions from './component-actions';
import ComponentDetail from './component-detail';
import ImagesPayload from './image-library.stub';
import { getSuccessfulResponse } from '../../api';

const responses = [
  getSuccessfulResponse('/pages/images', ImagesPayload),
];

export default responses;
export const Custom = [ComponentDetail, ComponentActions];
