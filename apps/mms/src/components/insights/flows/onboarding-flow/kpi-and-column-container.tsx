import { InsightKpiColumnCardResponse } from '@lths/features/mms/data-access';
import { VerticalBarChart } from '@lths/shared/ui-charts';
import { BasicCard, VStack, InfoTooltip } from '@lths/shared/ui-elements';


import { KpiList } from './kpi-list';


type Props = {
  data: InsightKpiColumnCardResponse;
};

export const KpiAndColumnContainer = ({ data } : Props) => {
  if (!data || !data.data) return null;
  
  const action = data.data.info && <InfoTooltip title={''} description={data.data.info.description} action={{ url: data.data.info.url }} />;

  return (
    <BasicCard title={data.data.title} 
      subheader={data.data.subtitle} 
      action={ action} sx={{ flex: 1 }} alignItems="stretch">
      <VStack spacing={8}>
        <KpiList data={{data: data.data.kpiData}} />
        <VerticalBarChart includeSteps={true} data={ data.data.columnData}/>
      </VStack>
    </BasicCard>
  );
};

