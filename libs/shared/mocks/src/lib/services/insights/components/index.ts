import ComponentsHistogramPayload from './histogram.stub';
import ComponentsKpiPayload from './kpi.stub';
import { getSuccessfulResponse } from '../../api';

const responses = [
  getSuccessfulResponse('/insights/components/kpi', ComponentsKpiPayload),
  getSuccessfulResponse('/insights/components/histogram', ComponentsHistogramPayload),
  //TODO need to add table
];

export default responses;
