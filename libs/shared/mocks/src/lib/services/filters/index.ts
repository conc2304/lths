import FiltersPayload from './filters.stub';
import { getSuccessfulResponse } from '../api';

const responses = [getSuccessfulResponse('/models/filters', FiltersPayload)];

export default responses;
