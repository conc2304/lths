import { InsightKpiResponse, KPI } from '@lths/features/mms/data-access';
import { HStack, KpiSparklineCard } from '@lths/shared/ui-elements';

type Props = {
  data: InsightKpiResponse;
};
const DURATION_SEVEN = 7;
const CardItem = ({ data }: { data: KPI }) => {
  const { title, value, info, unit, data: metrics } = data;
  const trends = metrics.find((o) => o.duration === DURATION_SEVEN);

  const tooltip = !info ? null : { description: info.description, action: { url: info.url }, title };

  return <KpiSparklineCard hero={value} heroUnit={unit} title={title} tooltip={tooltip} trends={trends} />;
};
export const KpiContainer = ({ data }: Props) => {
  if (!data || !data.data) return null;
  return (
    <HStack>
      {data.data.map((o, i) => {
        return <CardItem key={`kpi_card_${i}`} data={o} />;
      })}
    </HStack>
  );
};
