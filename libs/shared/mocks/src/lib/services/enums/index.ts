import { getEnumByName, enumData } from './enums.stub';
import { getSuccessfulResponse } from '../api';

const responses = [
  getSuccessfulResponse('/enums', { data: enumData }),
  getSuccessfulResponse('/enums/EventType', getEnumByName('EventType')),
  getSuccessfulResponse('/enums/UserSegments', getEnumByName('UserSegments')),
  getSuccessfulResponse('/enums/EventState', getEnumByName('EventState')),
  getSuccessfulResponse('/enums/FeatureFlags', getEnumByName('FeatureFlags')),
  getSuccessfulResponse('/enums/Location', getEnumByName('Location')),
  getSuccessfulResponse('/enums/PageName', getEnumByName('PageName')),
  getSuccessfulResponse('/enums/ComponentCategories', getEnumByName('ComponentCategories')),
  getSuccessfulResponse('/enums/FCMTopics', getEnumByName('FCMTopics')),
];

export default responses;
