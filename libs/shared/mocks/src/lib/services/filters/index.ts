import FiltersPayload from './filters.stub';
import { getSuccessfulResponse } from '../api';

const responses = [getSuccessfulResponse('/mms/filters', FiltersPayload)];

export default responses;
