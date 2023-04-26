import { InsightHistogramResponse, Histogram } from '@lths/features/mms/data-access';
import { BasicCard, HStack, InfoTooltip, KpiSparklineCard } from '@lths/shared/ui-elements';
import LineChart from 'libs/shared/ui-charts/line-chart';

type Props = {
  data: InsightHistogramResponse;
};
const CardItem = ({ data }: { data: Histogram }) => {
  const { title, subtitle, info, data: metrics } = data;
  const action = info && <InfoTooltip title={''} description={info.description} action={{ url: info.url }} />;
  return (
    <BasicCard title={title} subheader={subtitle} action={action} sx={{ flex: 1 }}>
      <LineChart data={metrics} />
    </BasicCard>
  );
};
export const HistogramContainer = ({ data }: Props) => {
  if (!data || !data.data) return null;
  return (
    <HStack>
      {data.data.map((o, i) => {
        return <CardItem key={`histogram_card_${i}`} data={o} />;
      })}
    </HStack>
  );
};
