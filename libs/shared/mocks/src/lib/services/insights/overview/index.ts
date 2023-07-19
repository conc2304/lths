import OverviewHistogramPayload from './histogram.stub';
import OverviewKpiPayload from './kpi.stub';
import OverviewSegmentationPayload from './segmentation.sub';
import OverviewTabularPayload from './tabular.sub';
import { getSuccessfulResponse } from '../../api';

const responses = [
  getSuccessfulResponse('/mms/kpi', OverviewKpiPayload),
  getSuccessfulResponse('/mms/histogram', OverviewHistogramPayload),
  getSuccessfulResponse('/mms/donut', OverviewSegmentationPayload),
  getSuccessfulResponse('/mms/usage-metric-table', OverviewTabularPayload),
];

export default responses;
