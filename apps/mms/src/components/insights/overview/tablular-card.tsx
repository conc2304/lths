import React from 'react';
import { SelectChangeEvent, Select, MenuItem } from '@mui/material';
import { InsightTabularResponse } from '@lths/features/mms/data-access';
import { GenericTableCellProps, HStack, BasicCard, GenericTable } from '@lths/shared/ui-elements';
import { InfoTooltip } from '@lths/shared/ui-elements';

type ItemOption = { value: string; label: string };

const DropdownList = ({
  data,
  value,
  onChange,
}: {
  data: ItemOption[];
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}) => {
  return (
    <Select value={value} label="" onChange={onChange} size="small">
      {data.map((o, i) => (
        <MenuItem key={`drop_down_item_${i}`} value={o.value}>
          {o.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export const TabularCurrentCard = ({
  data,
  filter,
  onChange,
}: {
  data: InsightTabularResponse;
  filter: string;
  onChange: (event: SelectChangeEvent) => void;
}) => {
  if (!data?.data) return null;

  const {
    data: { title, subtitle, info, metrics },
  } = data;

  if (metrics.length === 0) return null;

  const metric = metrics.find((o) => o.id === filter);

  if (!metric) return null;

  const ddoptions: ItemOption[] = metrics.map((o) => ({ value: o.id, label: o.title }));

  const action = (
    <HStack>
      <DropdownList data={ddoptions} value={filter} onChange={onChange} />
      {info && <InfoTooltip title={''} description={info.description} action={{ url: info.url }} />}
    </HStack>
  );
  const headers: GenericTableCellProps[] = metric.labels.map((o) => ({
    label: o.label,
    id: o.slug,
  }));

  return (
    <BasicCard title={title} subheader={subtitle} action={action} sx={{ flex: 1 }}>
      <GenericTable headers={headers} data={metric.data} />
    </BasicCard>
  );
};
export const TabularCard = ({ data }: { data: InsightTabularResponse }) => {
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
  return <TabularCurrentCard filter={tableFilterId} data={data} onChange={onChange} />;
};
