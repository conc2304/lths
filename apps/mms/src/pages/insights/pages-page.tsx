import { Stack } from '@mui/material';

import {
  useLazyGetInsightPagesHistogramQuery,
  useLazyGetInsightPagesPreviewQuery,
  useLazyGetInsightPagesKpiQuery,
  useLazyGetInsightPagesHistogram2Query,
} from '@lths/features/mms/data-access';
import { FilterSettingsQueryParams, VStack } from '@lths/shared/ui-elements';

import { ConnectedUiFilter } from '../../components/common/connected-ui-filter';
import { HistogramContainer, KpiContainer } from '../../components/insights/overview';
import { PreviewContainer } from '../../components/insights/pages';

const PagesPage = (): JSX.Element => {
  const [getKpiData, { data: kpiData, isError: kpiError }] = useLazyGetInsightPagesKpiQuery();

  const [getHistogramData, { data: histogramData, isError: histogramError }] = useLazyGetInsightPagesHistogramQuery();

  const [getHistogram2Data, { data: histogram2Data, isError: histogram2Error }] =
    useLazyGetInsightPagesHistogram2Query();

  const [getPreviewData, { data: previewData, isError: previewDataError }] = useLazyGetInsightPagesPreviewQuery();

  async function handleFilterUpdate(filterSettings: FilterSettingsQueryParams) {
    const {
      date_range: [start_date, end_date],
      filters,
    } = filterSettings;
    if (!filterSettings || !start_date || !end_date || !filters) return;

    await Promise.all([
      getKpiData(filterSettings),
      getHistogramData(filterSettings),
      getHistogram2Data(filterSettings),
      getPreviewData(filterSettings),
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

      {!kpiError && <KpiContainer data={kpiData} />}
      {!histogramError && <PreviewContainer data={previewData} />}
      {!histogram2Error && <HistogramContainer data={histogram2Data} />}
      {!previewDataError && <HistogramContainer data={histogramData} />}
    </VStack>
  );
};

export default PagesPage;
