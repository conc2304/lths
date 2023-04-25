import OverviewCardKpiPayload from './cardkpi.stub';
import OverviewHistogramPayload from './histogram.stub';
import OverviewHistogramDataPayload from './histogramdata.stub';
import OverviewKpiPayload from './kpi.stub';
import OverviewPagePreviewPayload from './pagepreview.stub';
import OverviewSegmentationPayload from './segmentation.sub';
import OverviewTabularPayload from './tabular.sub';
import { getSuccessfulResponse } from '../../api';

const responses = [
  getSuccessfulResponse('/insights/overview/kpi', OverviewKpiPayload),
  getSuccessfulResponse('/insights/overview/histogram', OverviewHistogramPayload),
  getSuccessfulResponse('/insights/overview/segmentation', OverviewSegmentationPayload),
  getSuccessfulResponse('/insights/overview/tabular', OverviewTabularPayload),
  getSuccessfulResponse('/insights/overview/cardkpi', OverviewCardKpiPayload),
  getSuccessfulResponse('/insights/overview/pagepreview', OverviewPagePreviewPayload),
  getSuccessfulResponse('/insights/overview/histogramdata', OverviewHistogramDataPayload),
];

export default responses;
