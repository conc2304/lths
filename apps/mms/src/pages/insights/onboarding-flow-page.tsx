import { useEffect } from 'react';
import { Stack } from '@mui/material';
import {
  // ToDo(onboarding): Replace with coloumn and flow graph
  useLazyGetInsightOnboardingKpiColumnCardQuery,
  useLazyGetInsightOnboardingHistogramQuery,
  useLazyGetInsightOnboardingKpiQuery,
} from '@lths/features/mms/data-access';
import { DateFilter } from '@lths/features/mms/data-access';
import { VStack } from '@lths/shared/ui-elements';
import { FilterFormStateProvider, UiFilters } from '@lths/shared/ui-filters';

import { KpiAndColumnContainer } from '../../components/insights/flows/onboarding-flow';
import { HistogramContainer } from '../../components/insights/overview';
import { ButtonGroupConf } from '../../fixtures/date-button-group-schema';
import { Schema } from '../../fixtures/filter-schema';

const OnboardingFlowPage = (): JSX.Element => {
  const [getKpiColumnCardData, { isFetching: isKpiColumnCardFetching, isLoading: isKpiColumnCardLoading, data: kpiColumnCardData }] =
  useLazyGetInsightOnboardingKpiColumnCardQuery();
  
  const [getKpiData, { isFetching: isKpiFetching, isLoading: isKpiLoading, data: kpiData }] =
    useLazyGetInsightOnboardingKpiQuery();

  const [getHistogramData, { isFetching: isHistogramFetching, isLoading: isHistogramLoading, data: histogramData }] =
    useLazyGetInsightOnboardingHistogramQuery();

  async function fetchData() {
    const filter: DateFilter = { start_date: null, end_date: null };

    await Promise.all([
      getKpiColumnCardData(filter),
      getKpiData(filter),
      getHistogramData(filter),
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
      <VStack spacing={6.375}>
        <KpiAndColumnContainer data={kpiColumnCardData}/>
        {<HistogramContainer data={histogramData} /> /* toDo replace with histogram data*/}
        <HistogramContainer data={histogramData} />
      </VStack>
    </VStack>
  );
};

export default OnboardingFlowPage;
