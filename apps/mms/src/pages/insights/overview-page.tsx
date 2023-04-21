import { useEffect } from 'react';
import { Stack } from '@mui/material';
import {
  useLazyGetInsightOverviewHistogramQuery,
  useLazyGetInsightOverviewKpiQuery,
  useLazyGetInsightOverviewSegmentationQuery,
  useLazyGetInsightOverviewTabularQuery,
} from '@lths/features/mms/data-access';
import { DateFilter } from '@lths/features/mms/data-access';
import { HStack, VStack } from '@lths/shared/ui-elements';
import { FilterFormStateProvider, UiFilters } from '@lths/shared/ui-filters';

import { DonutContainer, TabularContainer, KpiContainer, HistogramContainer } from '../../components/insights/overview';
import { ButtonGroupConf } from '../../fixtures/date-button-group-schema';
import { Schema } from '../../fixtures/filter-schema';

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

  async function fetchData() {
    const filter: DateFilter = { start_date: null, end_date: null };
    //getKpiData(filter);
    await Promise.all([
      getKpiData(filter),
      getHistogramData(filter),
      getSegmentationData(filter),
      getTabularData(filter),
    ]);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack spacing={2}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <FilterFormStateProvider>
          <UiFilters
            dateOptions={ButtonGroupConf}
            formSchema={Schema.payload.data}
            handleApplyFilter={() => console.log(' MAKE FETCH REQUEST THAT WILL RELOAD ANALYTICS DATA')}
          />
        </FilterFormStateProvider>
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
