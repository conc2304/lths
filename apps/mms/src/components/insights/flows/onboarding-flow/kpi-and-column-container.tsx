import { InsightKpiColumnCardResponse } from '@lths/features/mms/data-access';
// import { LineChart } from '@lths/shared/ui-charts'; // ToDO: replace with columns chart
import { BasicCard, VStack, InfoTooltip } from '@lths/shared/ui-elements';

import { KpiList } from './kpi-list';

type Props = {
  data: InsightKpiColumnCardResponse;
};

// const HistogramItem = ({ data }: { data: Histogram }) => {
//   const { title, subtitle, info, data: metrics } = data;
//   const action = info && <InfoTooltip title={''} description={info.description} action={{ url: info.url }} />;
//   return (
//     <LineChart data={metrics} />
//   );
// };

export const KpiAndColumnContainer = ({ data } : Props) => {
  if (!data || !data.data) return null;
  
  const action = data.data.info && <InfoTooltip title={''} description={data.data.info.description} action={{ url: data.data.info.url }} />;

  return (
    <BasicCard title={data.data.title} 
      subheader={data.data.subtitle} 
      action={ action} sx={{ flex: 1, paddingBottom: '20px' }} alignItems="stretch">
      <VStack>
        <KpiList data={{data: data.data.kpiData}} />
        <div>{data.data.columnData}</div>
        {/* todo replace histogram with barchart */}
        {/* { (histogramData && histogramData.data) && histogramData.data.map((o, i) => {
          return <HistogramItem key={`histogram_${i}`} data={o}/>;
        })} */}
      </VStack>
    </BasicCard>
  );
};
