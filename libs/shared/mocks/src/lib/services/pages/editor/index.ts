import ComponentActions from './component-actions';
import ComponentDetail from './component-detail';
import ComponentsPayload from './components.stub';
import { getSuccessfulResponse } from '../../api';

const responses = [getSuccessfulResponse('/pages/components', ComponentsPayload)];

export default responses;
export const Custom = [ComponentDetail, ComponentActions];
