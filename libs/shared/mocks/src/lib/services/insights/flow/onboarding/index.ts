import OnboardingHistogramPayload from './histogram.stub';
import OnboardingKpiColumnCardPayload from './kpi-column-card.stub';
import OnboardingKpiPayload from './kpi.stub';
import { getSuccessfulResponse } from '../../../api';

const responses = [
  getSuccessfulResponse('/insights/flows/onboarding/kpi', OnboardingKpiPayload),
  getSuccessfulResponse('/insights/flows/onboarding/kpi-column-card', OnboardingKpiColumnCardPayload),
  getSuccessfulResponse('/insights/flows/onboarding/histogram', OnboardingHistogramPayload),
  // ToDo(onboarding): Replace with coloumn and flow graph
];

export default responses;
