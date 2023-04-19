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
} from '@lths/shared/ui-elements';
import {
  useLazyGetInsightOverviewHistogramQuery,
  useLazyGetInsightOverviewKpiQuery,
  useLazyGetInsightOverviewQuery,
} from 'libs/features/mms/data-access/src/lib/insights/overview-api';
import { DateFilter } from 'libs/features/mms/data-access/src/lib/insights/types';
import { KpiCardProps, TrendProps } from 'libs/shared/ui-elements/src/lib/data-display/cards/kpi/kpi-card';
import DesignSystem from '../design-system';
import { FilterFormStateProvider, UiFilters } from '@lths/shared/ui-filters';
import { ButtonGroupConf } from '../../fixtures/date-button-group-schema';
import { Schema } from '../../fixtures/filter-schema';
import InfoTooltip from 'libs/shared/ui-elements/src/lib/data-display/icons/tooltip/info-tooltip';

const OverviewPage = (): JSX.Element => {
  const [getKpiData, { isFetching: isKpiFetching, isLoading: isKpiLoading, data: kpiData }] =
    useLazyGetInsightOverviewKpiQuery();

  const [getHistogramData, { isFetching: isHistogramFetching, isLoading: isHistogramLoading, data: histogramData }] =
    useLazyGetInsightOverviewHistogramQuery();

  async function fetchData() {
    const filter: DateFilter = { start_date: null, end_date: null };
    //getKpiData(filter);
    await Promise.all([getKpiData(filter), getHistogramData(filter)]);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
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
        const { title, subtitle, info } = o;
        const action = info && <InfoTooltip title={''} description={info.description} action={{ url: info.url }} />;
        return (
          <BasicCard key={`overview_histogram_${i}`} title={title} subheader={subtitle} action={action}></BasicCard>
        );
      })}
    </Box>
  );
};

export default OverviewPage;
