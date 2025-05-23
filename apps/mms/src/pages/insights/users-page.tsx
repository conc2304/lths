import { Stack } from '@mui/material';

import {
  useLazyGetInsightOverviewHistogramQuery,
  useLazyGetInsightOverviewKpiQuery,
  useLazyGetInsightOverviewSegmentationQuery,
} from '@lths/features/mms/data-access';
import { FilterSettingsQueryParams, VStack } from '@lths/shared/ui-elements';

import { ConnectedUiFilter } from '../../components/common/connected-ui-filter';
import { HistogramContainer } from '../../components/insights/overview';
import { DonutContainer } from '../../components/insights/users';

//TODO: the unused variables are for future implemenattion of skeletons, so don't remove them from here
/* eslint-disable @typescript-eslint/no-unused-vars */

export default function UsersPage() {
  const [getKpiData, { isFetching: isKpiFetching, isLoading: isKpiLoading, data: kpiData }] =
    useLazyGetInsightOverviewKpiQuery();

  const [getHistogramData, { isFetching: isHistogramFetching, isLoading: isHistogramLoading, data: histogramData }] =
    useLazyGetInsightOverviewHistogramQuery();

  const [
    getSegmentationData,
    { isFetching: isSegmentationFetching, isLoading: isSegmentationLoading, data: segmentationData },
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

      <DonutContainer data={segmentationData} />

      <HistogramContainer data={histogramData} />
      <HistogramContainer data={histogramData} />
    </VStack>
  );
}
