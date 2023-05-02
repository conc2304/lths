import { useEffect } from 'react';
import { Stack } from '@mui/material';
import {
  useLazyGetInsightOverviewHistogramQuery,
  useLazyGetInsightOverviewKpiQuery,
  useLazyGetInsightOverviewSegmentationQuery,
  useLazyGetInsightOverviewTabularQuery,
} from '@lths/features/mms/data-access';
import { DateFilter } from '@lths/features/mms/data-access';
import { DonutChart } from '@lths/shared/ui-charts';
import { HStack, VStack } from '@lths/shared/ui-elements';
import { BasicCard } from '@lths/shared/ui-elements';
import { FilterFormStateProvider, UiFilters } from '@lths/shared/ui-filters';
import InfoTooltip from 'libs/shared/ui-elements/src/lib/data-display/icons/tooltip/info-tooltip';

import { HistogramContainer } from '../../components/insights/overview';
import { ButtonGroupConf } from '../../fixtures/date-button-group-schema';
import { Schema } from '../../fixtures/filter-schema';

export default function UsersPage() {
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
  if (!segmentationData) return null;

  const {
    data: { title, subtitle, info, metrics },
  } = segmentationData;
  const action = info && <InfoTooltip title={''} description={info.description} action={{ url: info.url }} />;

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

      <HStack>
        <BasicCard title={title} subheader={subtitle} action={action} sx={{ flex: 1 }}>
          <div style={{ width: '90%', height: '100%', paddingBottom: '80px' }}>
            <DonutChart data={metrics[0]} />
          </div>
        </BasicCard>
        <BasicCard title={title} subheader={subtitle} action={action} sx={{ flex: 1 }}>
          <div style={{ width: '90%', height: '100%', paddingBottom: '80px' }}>
            <DonutChart data={metrics[1]} />
          </div>
        </BasicCard>
        <BasicCard title={title} subheader={subtitle} action={action} sx={{ flex: 1 }}>
          <div style={{ width: '90%', height: '100%', paddingBottom: '80px' }}>
            <DonutChart data={metrics[0]} />
          </div>
        </BasicCard>
      </HStack>
      <HistogramContainer data={histogramData} />
      <HistogramContainer data={histogramData} />
    </VStack>
  );
}
