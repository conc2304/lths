import { InsightSegmentationResponse } from '@lths/features/mms/data-access';
import { DonutChart } from '@lths/shared/ui-charts';
import { BasicCard, HStack, InfoTooltip } from '@lths/shared/ui-elements';

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
    <HStack>
      <BasicCard title={title} subheader={subtitle} action={action} sx={{ flex: 1 }}>
        <div style={{ width: '98%', height: '100%', paddingBottom: '80px' }}>
          <DonutChart data={metrics[1]} />
        </div>
      </BasicCard>
      <BasicCard title={title} subheader={subtitle} action={action} sx={{ flex: 1 }}>
        <div style={{ width: '98%', height: '100%', paddingBottom: '80px' }}>
          <DonutChart data={metrics[0]} />
        </div>
      </BasicCard>
      <BasicCard title={title} subheader={subtitle} action={action} sx={{ flex: 1 }}>
        <div style={{ width: '98%', height: '100%', paddingBottom: '80px' }}>
          <DonutChart data={metrics[0]} />
        </div>
      </BasicCard>
    </HStack>
  );
};
