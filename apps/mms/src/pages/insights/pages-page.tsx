import { Stack } from '@mui/material';

import {
  useLazyGetInsightPagesHistogramQuery,
  useLazyGetInsightPagesPreviewQuery,
  useLazyGetInsightPagesKpiQuery,
  useLazyGetInsightPagesHistogram2Query,
} from '@lths/features/mms/data-access';
import { VStack } from '@lths/shared/ui-elements';
import { FilterSettingsPayload } from '@lths/shared/ui-elements';

import { ConnectedUiFilter } from '../../components/common/connected-ui-filter';
import { HistogramContainer, KpiContainer } from '../../components/insights/overview';
import { PreviewContainer } from '../../components/insights/pages';

const PagesPage = (): JSX.Element => {
  const [getKpiData, { data: kpiData }] = useLazyGetInsightPagesKpiQuery();

  const [getHistogramData, { data: histogramData }] = useLazyGetInsightPagesHistogramQuery();

  const [getHistogram2Data, { data: histogram2Data }] = useLazyGetInsightPagesHistogram2Query();

  const [getPreviewData, { data: previewData }] = useLazyGetInsightPagesPreviewQuery();

  async function handleFilterUpdate(filterSettings: FilterSettingsPayload) {
    const {
      date_range: { start_date, end_date },
      metrics,
    } = filterSettings;
    if (!filterSettings || !start_date || !end_date || !metrics) return;

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
          onFiltersUpdate={(filters: FilterSettingsPayload) => {
            handleFilterUpdate(filters);
          }}
        />
      </Stack>

      <KpiContainer data={kpiData} />
      <PreviewContainer data={previewData} />
      <HistogramContainer data={histogram2Data} />
      <HistogramContainer data={histogramData} />
    </VStack>
  );
};

export default PagesPage;
