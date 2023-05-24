import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { InsightKpiResponse, KPI } from '@lths/features/mms/data-access';
import { HStack, KpiCard } from '@lths/shared/ui-elements';

type Props = {
  data: InsightKpiResponse;
};

const DURATION_SEVEN = 7;
const KpiItem = ({ data }: { data: KPI }) => {
  const { title, value, unit, data: metrics } = data;

  const trends = metrics.find((o) => o.duration === DURATION_SEVEN);
  const trendsSpan = !trends ? null : { duration: trends.duration, span: trends.span };

  return (
    <div style={{position: 'relative', flex: 1}}>
      <KpiCard hero={value} heroUnit={unit} title={title} trends={trendsSpan} />
    </div>
    );
};

export const KpiList = ({ data }: Props) => {
  const theme = useTheme();
  if (!data || !data.data) return null;

  return (
    <>
      <HStack sx={{paddingLeft: theme.spacing(3.125), paddingRight: theme.spacing(5)}} 
        divider={<Divider sx={{}} orientation="vertical" flexItem/>}>
        {data.data.map((o, i) => {
          return <KpiItem key={`kpi_card_${i}`} data={o} />;
        })}
      </HStack>
      <Divider classes={{ root: 'custom-divider' }} sx={{ '&.custom-divider': { marginTop: 0 } }} flexItem/>
    </>
  );
};
