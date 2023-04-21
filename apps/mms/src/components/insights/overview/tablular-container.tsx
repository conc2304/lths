import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import { InsightTabularResponse } from '@lths/features/mms/data-access';

import { TabularCard } from './tabular-card';
type Props = { data: InsightTabularResponse };

export const TabularContainer = ({ data }: Props) => {
  const [tableFilterId, setTableFilterId] = React.useState<string>('');

  const onChange = (event: SelectChangeEvent) => {
    setTableFilterId(event.target.value as string);
  };

  React.useEffect(() => {
    if (data?.data) {
      const {
        data: { options, metrics },
      } = data;

      const filter = options?.curr_filter || metrics[0].id;
      setTableFilterId(filter);
    } else setTableFilterId(null);
  }, [data]);
  return <TabularCard filter={tableFilterId} data={data} onChange={onChange} />;
};
