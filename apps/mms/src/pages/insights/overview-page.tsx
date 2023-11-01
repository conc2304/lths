import { Stack } from '@mui/material';

import {
  useLazyGetInsightOverviewHistogramQuery,
  useLazyGetInsightOverviewKpiQuery,
  useLazyGetInsightOverviewSegmentationQuery,
  useLazyGetInsightOverviewTabularQuery,
} from '@lths/features/mms/data-access';
import { FilterSettingsQueryParams, HStack, VStack } from '@lths/shared/ui-elements';

import { ConnectedUiFilter } from '../../components/common/connected-ui-filter';
import { DonutContainer, TabularContainer, KpiContainer, HistogramContainer } from '../../components/insights/overview';

//TODO: the unused variables are for future implemenattion of skeletons, so don't remove them from here
/* eslint-disable @typescript-eslint/no-unused-vars */

const OverviewPage = (): JSX.Element => {
  console.log('OverviewPage');
  const [getKpiData, { isFetching: isKpiFetching, isLoading: isKpiLoading, isError: kpiError, data: kpiData }] =
    useLazyGetInsightOverviewKpiQuery();

  const [
    getTabularData,
    { isFetching: isTabularFetching, isLoading: isTabularLoading, isError: tabulardataError, data: tabularData },
  ] = useLazyGetInsightOverviewTabularQuery();

  const [
    getHistogramData,
    { isFetching: isHistogramFetching, isLoading: isHistogramLoading, isError: histogramError, data: histogramData },
  ] = useLazyGetInsightOverviewHistogramQuery();

  const [
    getSegmentationData,
    {
      isFetching: isSegmentationFetching,
      isLoading: isSegmentationLoading,
      isError: segmenationError,
      data: segmentationData,
    },
  ] = useLazyGetInsightOverviewSegmentationQuery();

  async function handleFilterUpdate(filterSettings: FilterSettingsQueryParams) {
    const {
      date_range: [start_date, end_date],
      filters,
    } = filterSettings;
    if (!filterSettings || !start_date || !end_date || !filters) return;

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
          onFiltersUpdate={(filters: FilterSettingsQueryParams) => {
            handleFilterUpdate(filters);
          }}
        />
      </Stack>

      {!kpiError && kpiData && <KpiContainer data={kpiData} />}
      {!histogramError && histogramData && <HistogramContainer data={histogramData} />}
      <HStack>
        {!segmenationError && segmentationData && <DonutContainer data={segmentationData} />}
        {!tabulardataError && tabularData && <TabularContainer data={tabularData} />}
      </HStack>
    </VStack>
  );
};

export default OverviewPage;
