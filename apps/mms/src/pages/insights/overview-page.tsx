import { Stack } from '@mui/material';

import {
  useLazyGetInsightOverviewHistogramQuery,
  useLazyGetInsightOverviewKpiQuery,
  useLazyGetInsightOverviewSegmentationQuery,
  useLazyGetInsightOverviewTabularQuery,
} from '@lths/features/mms/data-access';
import { HStack, VStack } from '@lths/shared/ui-elements';
import { FilterSettingsPayload } from '@lths/types/ui-filters';

import { ConnectedUiFilter } from '../../components/common/connected-ui-filter';
import { DonutContainer, TabularContainer, KpiContainer, HistogramContainer } from '../../components/insights/overview';

const OverviewPage = (): JSX.Element => {
  const [getKpiData, { isFetching: isKpiFetching, isLoading: isKpiLoading, data: kpiData }] =
    useLazyGetInsightOverviewKpiQuery();

  const [getTabularData, { isFetching: isTabularFetching, isLoading: isTabularLoading, data: tabularData }] =
    useLazyGetInsightOverviewTabularQuery();
  console.log('🚀 ~ file: overview-page.tsx:40 ~ tabularData:', tabularData, tabularData?.data?.metrics);
  const [getHistogramData, { isFetching: isHistogramFetching, isLoading: isHistogramLoading, data: histogramData }] =
    useLazyGetInsightOverviewHistogramQuery();

  const [
    getSegmentationData,
    { isFetching: isSegmentationFetching, isLoading: isSegmentationLoading, data: segmentationData },
  ] = useLazyGetInsightOverviewSegmentationQuery();

  async function handleFilterUpdate(filterSettings: FilterSettingsPayload) {
    const {
      date_range: { start_date, end_date },
      metrics,
    } = filterSettings;
    if (!filterSettings || !start_date || !end_date || !metrics) return;

    await Promise.all([
      getKpiData(filterSettings),
      getHistogramData(filterSettings),
      getSegmentationData(filterSettings),
      getTabularData(filterSettings),
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

      <KpiContainer data={kpiData} />
      <HistogramContainer data={histogramData} />
      <HStack>
        <DonutContainer data={segmentationData} />
        <TabularContainer data={tabularData} />
      </HStack>
    </VStack>
  );
};

export default OverviewPage;
