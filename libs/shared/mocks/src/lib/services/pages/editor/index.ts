import ComponentActions from './component-actions';
import ComponentDetail from './component-detail';
import UpcomingEventsPayload from './events-upcoming.stub';
import ImagesPayload from './image-library.stub';
import { getSuccessfulResponse } from '../../api';

const responses = [
  getSuccessfulResponse('/pages/images', ImagesPayload),
  getSuccessfulResponse('/events/upcoming', UpcomingEventsPayload),
];

export default responses;
export const Custom = [ComponentDetail, ComponentActions];
