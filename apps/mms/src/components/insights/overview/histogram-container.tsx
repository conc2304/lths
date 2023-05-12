import { InsightHistogramResponse, Histogram } from '@lths/features/mms/data-access';
import { LineChart } from '@lths/shared/ui-charts';
import { BasicCard, HStack, InfoTooltip, KpiSparklineCard } from '@lths/shared/ui-elements';

type Props = {
  data: InsightHistogramResponse;
};
const CardItem = ({ data }: { data: Histogram }) => {
  const { title, subtitle, info, data: metrics, options } = data;
  const action = info && <InfoTooltip title={''} description={info.description} action={{ url: info.url }} />;
  return (
    <BasicCard title={title} subheader={subtitle} action={action} sx={{ flex: 1 }}>
      <LineChart data={metrics} options={options} />
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
