import OverviewHistogramPayload from './histogram.stub';
import OverviewKpiPayload from './kpi.stub';
import OverviewSegmentationPayload from './segmentation.sub';
import OverviewTabularPayload from './tabular.sub';
import { getSuccessfulResponse } from '../../api';

const responses = [
  getSuccessfulResponse('/insights/overview/kpi', OverviewKpiPayload),
  getSuccessfulResponse('/insights/overview/histogram', OverviewHistogramPayload),
  getSuccessfulResponse('/insights/overview/segmentation', OverviewSegmentationPayload),
  getSuccessfulResponse('/insights/overview/tabular', OverviewTabularPayload),
];

export default responses;
