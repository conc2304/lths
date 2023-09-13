import { Stack } from '@mui/material';

import {
  // ToDo(onboarding): Replace with coloumn and flow graph
  useLazyGetInsightOnboardingKpiColumnCardQuery,
  useLazyGetInsightPagesPreviewQuery,
  useLazyGetInsightOnboardingHistogramQuery,
  useLazyGetInsightOnboardingKpiQuery,
} from '@lths/features/mms/data-access';
import { VStack } from '@lths/shared/ui-elements';
import { FilterSettingsPayload } from '@lths/shared/ui-elements';

import { ConnectedUiFilter } from '../../components/common/connected-ui-filter';
import { KpiAndColumnContainer } from '../../components/insights/flows/onboarding-flow';
import { HistogramContainer } from '../../components/insights/overview';
import { PreviewContainer } from '../../components/insights/pages';

//TODO: the unused variables are for future implemenattion of skeletons, so don't remove them from here
/* eslint-disable @typescript-eslint/no-unused-vars */

const OnboardingFlowPage = (): JSX.Element => {
  const [
    getKpiColumnCardData,
    { isFetching: isKpiColumnCardFetching, isLoading: isKpiColumnCardLoading, data: kpiColumnCardData },
  ] = useLazyGetInsightOnboardingKpiColumnCardQuery();

  const [getPreviewData, { isFetching: isPreviewFetching, isLoading: isPreviewLoading, data: previewData }] =
    useLazyGetInsightPagesPreviewQuery();

  const [getKpiData, { isFetching: isKpiFetching, isLoading: isKpiLoading, data: kpiData }] =
    useLazyGetInsightOnboardingKpiQuery();

  const [getHistogramData, { isFetching: isHistogramFetching, isLoading: isHistogramLoading, data: histogramData }] =
    useLazyGetInsightOnboardingHistogramQuery();

  async function handleFilterUpdate(filterSettings: FilterSettingsPayload) {
    const {
      date_range: { start_date, end_date },
      metrics,
    } = filterSettings;
    if (!filterSettings || !start_date || !end_date || !metrics) return;

    await Promise.all([
      getKpiColumnCardData(filterSettings),
      getPreviewData(filterSettings),
      getKpiData(filterSettings),
      getHistogramData(filterSettings),
    ]);
  }

  return (
    <VStack spacing={2}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <ConnectedUiFilter
          onFiltersUpdate={(filters: FilterSettingsPayload) => {
            console.log('---- onFiltersUpdate');
            console.log(filters);
            handleFilterUpdate(filters);
          }}
        />
      </Stack>
      <VStack spacing={6.375}>
        <KpiAndColumnContainer data={kpiColumnCardData} />
        <PreviewContainer data={previewData} />
        <HistogramContainer data={histogramData} />
      </VStack>
    </VStack>
  );
};

export default OnboardingFlowPage;
