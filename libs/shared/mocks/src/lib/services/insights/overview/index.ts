import OverviewHistogramPayload from './histogram.stub';
import OverviewKpiPayload from './kpi.stub';
import { getSuccessfulResponse } from '../../api';

const responses = [
  getSuccessfulResponse('/insights/overview/kpi', OverviewKpiPayload),
  getSuccessfulResponse('/insights/overview/histogram', OverviewHistogramPayload),
];

export default responses;
