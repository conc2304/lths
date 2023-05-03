import PagesHistogramPayload from './histogram.stub';
import PagesKpiPayload from './kpi.stub';
import PagesPreviewPayload from './preview.stub';
import { getSuccessfulResponse } from '../../api';

const responses = [
  getSuccessfulResponse('/insights/pages/histogram', PagesHistogramPayload),
  getSuccessfulResponse('/insights/pages/kpi', PagesKpiPayload),
  getSuccessfulResponse('/insights/pages/preview', PagesPreviewPayload),
  //TODO need to add table
];

export default responses;
