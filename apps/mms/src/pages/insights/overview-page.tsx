import React, { useEffect } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TableCell,
  TableRow,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { NotificationRequest, useAppSelector, useLazyGetNotificationItemsQuery } from '@lths/features/mms/data-access';
import {
  Table,
  PageHeader,
  TablePaginationProps,
  TableSortingProps,
  KpiSparklineCard,
  DateRangeSelector,
  BasicCard,
  HStack,
  VStack,
  GenericTable,
  GenericTableCellProps,
} from '@lths/shared/ui-elements';
import {
  useLazyGetInsightOverviewHistogramQuery,
  useLazyGetInsightOverviewKpiQuery,
  useLazyGetInsightOverviewQuery,
  useLazyGetInsightOverviewSegmentationQuery,
  useLazyGetInsightOverviewTabularQuery,
} from 'libs/features/mms/data-access/src/lib/insights/overview-api';
import {
  DateFilter,
  InsightSegmentationResponse,
  InsightTabularResponse,
} from 'libs/features/mms/data-access/src/lib/insights/types';
import { KpiCardProps, TrendProps } from 'libs/shared/ui-elements/src/lib/data-display/cards/kpi/kpi-card';
import DesignSystem from '../design-system';
import { FilterFormStateProvider, UiFilters } from '@lths/shared/ui-filters';
import { ButtonGroupConf } from '../../fixtures/date-button-group-schema';
import { Schema } from '../../fixtures/filter-schema';
import InfoTooltip from 'libs/shared/ui-elements/src/lib/data-display/icons/tooltip/info-tooltip';
import LineChart from 'libs/shared/ui-charts/line-chart';
import DonutChart from 'libs/shared/ui-charts/donut-chart';
import { DonutCard, TabularCard } from '../../components/insights/overview';

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

  const [tableFilterId, setTableFilterId] = React.useState('');

  const onChange = (event: SelectChangeEvent) => {
    setTableFilterId(event.target.value as string);
  };

  const DropdownList = ({ data }) => {
    return (
      <Select value={tableFilterId} label="" onChange={onChange} size="small">
        {data.map((o, i) => (
          <MenuItem value={o.id}>{o.title}</MenuItem>
        ))}
      </Select>
    );
  };
  const TabularCurrentCard = ({ filter, data }: { filter: string; data: InsightTabularResponse }) => {
    if (!data?.data) return null;

    const {
      data: { title, subtitle, info, options, metrics },
    } = data;
    if (metrics.length > 0) {
      //const filter = options?.curr_filter || metrics[0].id;
      filter = filter || options?.curr_filter;
      setTableFilterId(filter);

      const data = metrics.find((o) => o.id === filter);
      const action = info && <InfoTooltip title={''} description={info.description} action={{ url: info.url }} />;

      const headers: GenericTableCellProps[] = data.labels.map((o) => ({
        label: o.label,
        id: o.slug,
      }));
      const comp = (
        <HStack>
          <DropdownList data={metrics} /> {action}
        </HStack>
      );
      return (
        <BasicCard title={title} subheader={subtitle} action={comp} sx={{ flex: 1 }}>
          <GenericTable headers={headers} data={data.data} />
        </BasicCard>
      );
    }
    return null;
  };

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
        {
          /*data?.payload?.data?.kpi.map((o, i) => {*/
          kpiData?.data.map((o, i) => {
            const { title, subtitle, value, info, unit, data } = o;
            const trends = data.find((o) => o.duration == 7);
            console.log('🚀 ~ file: overview-page.tsx:35 ~ {data?.payload?.data?.kpi.map ~ trends:', trends, data);

            const tooltip = !info ? null : { description: info.description, action: { url: info.url }, title };
            //const tooltip = { description: 'info.description', action: { url: 'info.url' }, title: '' };
            return <KpiSparklineCard hero={value} heroUnit={unit} title={title} tooltip={tooltip} trends={trends} />;
          })
        }
      </HStack>
      {histogramData?.data.map((o, i) => {
        const { title, subtitle, info, data } = o;
        const action = info && <InfoTooltip title={''} description={info.description} action={{ url: info.url }} />;
        return (
          <BasicCard key={`overview_histogram_${i}`} title={title} subheader={subtitle} action={action}>
            <LineChart data={data} />
          </BasicCard>
        );
      })}
      <HStack>
        <DonutCard data={segmentationData} />
        <TabularCard data={tabularData} />
      </HStack>
    </VStack>
  );
};

export default OverviewPage;
