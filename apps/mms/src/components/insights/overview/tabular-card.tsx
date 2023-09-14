import { SelectChangeEvent } from '@mui/material';

import { InsightTabularResponse } from '@lths/features/mms/data-access';
import { GenericTableCellProps, HStack, BasicCard, GenericTable } from '@lths/shared/ui-elements';
import { InfoTooltip } from '@lths/shared/ui-elements';

import { ItemOption, DropdownList } from './dropdown-list';

type TabularCardProps = {
  data: InsightTabularResponse;
  filter: string;
  onChange: (event: SelectChangeEvent) => void;
};

export const TabularCard = ({ data, filter, onChange }: TabularCardProps) => {
  if (!data?.data) return null;
  let subtitle = '';
  const {
    data: { title, info, metrics },
  } = data;

  if (metrics.length === 0) return null;

  const metric = metrics.find((o) => o.id === filter);

  if (!metric) return null;
  subtitle = metric.subtitle;
  const ddoptions: ItemOption[] = metrics.map((o) => ({ value: o.id, label: o.title }));

  const action = (
    <HStack>
      <DropdownList data={ddoptions} value={filter} onChange={onChange} />
      {info && <InfoTooltip title={''} description={info.description} action={{ url: info.url }} />}
    </HStack>
  );

  const headers: GenericTableCellProps[] = metric.labels.map((o) => {
    if (Object.entries(o).length === 1) {
      const id = Object.keys(o)[0];
      const label = o[id];
      return { label, id, unit: '*' };
    }
    return { label: o.label, id: o.slug, unit: o.unit, type: o.type };
  });

  return (
    <BasicCard title={title} subheader={subtitle} action={action} sx={{ flex: 1 }}>
      <GenericTable headers={headers} data={metric.data} />
    </BasicCard>
  );
};
