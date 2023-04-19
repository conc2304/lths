import React, { useEffect } from 'react';
import { Box, IconButton, Stack, TableCell, TableRow } from '@mui/material';
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
} from '@lths/shared/ui-elements';
import {
  useLazyGetInsightOverviewHistogramQuery,
  useLazyGetInsightOverviewKpiQuery,
  useLazyGetInsightOverviewQuery,
  useLazyGetInsightOverviewSegmentationQuery,
  useLazyGetInsightOverviewTabularQuery,
} from 'libs/features/mms/data-access/src/lib/insights/overview-api';
import { DateFilter } from 'libs/features/mms/data-access/src/lib/insights/types';
import { KpiCardProps, TrendProps } from 'libs/shared/ui-elements/src/lib/data-display/cards/kpi/kpi-card';
import DesignSystem from '../design-system';
import { FilterFormStateProvider, UiFilters } from '@lths/shared/ui-filters';
import { ButtonGroupConf } from '../../fixtures/date-button-group-schema';
import { Schema } from '../../fixtures/filter-schema';
import InfoTooltip from 'libs/shared/ui-elements/src/lib/data-display/icons/tooltip/info-tooltip';
import LineChart from 'libs/shared/ui-charts/line-chart';
import DonutChart from 'libs/shared/ui-charts/donut-chart';

const OverviewPage = (): JSX.Element => {
  const [getKpiData, { isFetching: isKpiFetching, isLoading: isKpiLoading, data: kpiData }] =
    useLazyGetInsightOverviewKpiQuery();

  const [getTabularData, { isFetching: isTabularFetching, isLoading: isTabularLoading, data: tabularData }] =
    useLazyGetInsightOverviewTabularQuery();

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
  const DonutChartItems = () => {
    if (!segmentationData) return null;

    const { title, subtitle, info, metrics } = segmentationData.data;
    const action = info && <InfoTooltip title={''} description={info.description} action={{ url: info.url }} />;

    return (
      <BasicCard title={title} subheader={subtitle} action={action} sx={{ flex: 1 }}>
        <div style={{ width: '90%' }}>
          <div style={{ width: '50%', height: '100%', float: 'left' }}>
            <DonutChart data={metrics[0]} />
          </div>
          <div style={{ width: '50%', height: '100%', float: 'left' }}>
            <DonutChart data={metrics[0]} />
          </div>
        </div>
        );
      </BasicCard>
    );
    /*
       Response\iveContainer not working with flexbox 
    return ( <HStack sx={{ width: '100%' }}>
          {metrics.map((o, i) => (
            <div style={{ width: '100%', height: '100%' }}>
              <DonutChart data={o} />
            </div>
          ))}
        </HStack>
      </BasicCard>
      );
    );
        */
  };
  return (
    <VStack spacing={2}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <DateRangeSelector
          dateOptions={ButtonGroupConf}
          onChange={({ startDate, endDate }) => {
            console.log('date changed', startDate, endDate);
          }}
        />

        <FilterFormStateProvider>
          <UiFilters
            // TODO  - add date picker to this component in next ticket
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

            const trendProp: TrendProps = {
              //types of trens: Time duration, Median
              duration: trends.duration,
              span: {
                title: trends.span.title,
                unit: trends.span.unit,
                value: trends.span.value,
                direction: trends.span.direction,
              },
              median: {
                title: trends.median.title,
                unit: trends.median.unit,
                value: trends.median.value,
                direction: trends.median.direction,
              },
            };

            const tooltip = !info ? null : { description: info.description, action: { url: info.url }, title };
            //const tooltip = { description: 'info.description', action: { url: 'info.url' }, title: '' };
            return (
              <KpiSparklineCard
                hero={value}
                heroUnit={unit}
                title={title}
                tooltip={tooltip}
                trends={{ ...trendProp }}
              />
            );
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
        <DonutChartItems />
        <BasicCard sx={{ flex: 1 }}></BasicCard>
      </HStack>
    </VStack>
  );
};

export default OverviewPage;
