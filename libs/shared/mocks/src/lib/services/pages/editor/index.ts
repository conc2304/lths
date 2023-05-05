import ComponentsPayload from './components.stub';
import { getSuccessfulResponse } from '../../api';

const responses = [getSuccessfulResponse('/pages/components', ComponentsPayload)];

export default responses;
