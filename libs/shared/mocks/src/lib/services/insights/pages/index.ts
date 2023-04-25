import PagesHistogramPayload from './histogram.stub';
import PagesKpiPayload from './kpi.stub';
import { getSuccessfulResponse } from '../../api';
import PagesPagePreviewPayload from '../pages/pagepreview.stub';

const responses = [
  getSuccessfulResponse('/insights/pages/histogram', PagesHistogramPayload),
  getSuccessfulResponse('/insights/pages/kpi', PagesKpiPayload),
  getSuccessfulResponse('/insights/pages/pagepreview', PagesPagePreviewPayload),
  //TODO need to add table
];

export default responses;
