import { InsightSegmentationResponse } from '@lths/features/mms/data-access';
import { DonutChart } from '@lths/shared/ui-charts';
import { BasicCard, InfoTooltip } from '@lths/shared/ui-elements';
//TODO: create nx lib for charts

type Props = {
  data: InsightSegmentationResponse;
};
export const DonutContainer = ({ data }: Props) => {
  if (!data) return null;

  const {
    data: { title, subtitle, info, metrics },
  } = data;
  const action = info && <InfoTooltip title={''} description={info.description} action={{ url: info.url }} />;

  return (
    <BasicCard title={title} subheader={subtitle} action={action} sx={{ flex: 1 }}>
      {/*  TODO: Response\iveContainer not working with flexbox */}
      <div style={{ width: '90%' }}>
        <div style={{ width: '50%', height: '100%', float: 'left' }}>
          <DonutChart data={metrics[0]} />
        </div>
        <div style={{ width: '50%', height: '100%', float: 'left' }}>
          <DonutChart data={metrics[1]} />
        </div>
      </div>
    </BasicCard>
  );
};
