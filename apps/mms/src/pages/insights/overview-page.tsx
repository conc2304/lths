import React, { useEffect } from 'react';
import { Box, IconButton, Stack, TableCell, TableRow } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { NotificationRequest, useLazyGetNotificationItemsQuery } from '@lths/features/mms/data-access';
import { Table, PageHeader, TablePaginationProps, TableSortingProps, KpiSparklineCard } from '@lths/shared/ui-elements';
import { useLazyGetInsightOverviewQuery } from 'libs/features/mms/data-access/src/lib/insights/overview-api';
import { DateFilter } from 'libs/features/mms/data-access/src/lib/insights/types';
import { KpiCardProps, TrendProps } from 'libs/shared/ui-elements/src/lib/data-display/cards/kpi/kpi-card';

const OverviewPage = (): JSX.Element => {
  const [getData, { isFetching, isLoading, isSuccess, data }] = useLazyGetInsightOverviewQuery();
  console.log('🚀 ~ file: overview-page.tsx:44 ~ OverviewPage ~ result:', isFetching, isLoading, data);

  async function fetchData() {
    const filter: DateFilter = { start_date: null, end_date: null };
    getData(filter);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);
  return (
    <Box>
      <Stack
        direction="row"
        //justifyContent="space-between"
        spacing={2}
      >
        {data?.payload?.data?.kpi.map((o, i) => {
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
          const trendProp2 = {
            //types of trens: Time duration, Median
            duration: 7,
            span: {
              title: 'Prev 7 days',
              unit: '%',
              value: 31,
              direction: 'up',
            },
            median: {
              title: 'Median',
              unit: '%',
              value: 7,
              direction: 'down',
            },
          };

          return (
            <KpiSparklineCard hero={value} heroUnit={unit} title={title} tooltipActionUrl="http://localhost:4200/insights/overview" trends={{ ...trendProp }} />
          );
        })}
      </Stack>
    </Box>
  );
};

export default OverviewPage;
