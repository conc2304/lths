import { InsightHistogramResponse, Histogram } from '@lths/features/mms/data-access';
import { LineChart } from '@lths/shared/ui-charts';
import { BasicCard, HStack, InfoTooltip, KpiSparklineCard } from '@lths/shared/ui-elements';

type Props = {
  data: InsightHistogramResponse;
};
const CardItem = ({ data }: { data: Histogram }) => {
  const { title, subtitle, info, data: metrics, options: eventsOption } = data;
  const action = info && <InfoTooltip title={''} description={info.description} action={{ url: info.url }} />;
  const histogramData2 = {
    // other props can be passed here
    data: [
      {
        name: 'Line 1',
        values: [
          {
            datetime: '2022-03-10T10:11:22Z',
            value: 1234,
            trends: {
              duration: 7,
              span: {
                title: 'Prev 7 days',
                unit: '%',
                value: 25,
                direction: 'down',
              },
              median: {
                title: 'Prev 7 days',
                unit: '%',
                value: 30,
                direction: 'up',
              },
            },
          },
          {
            datetime: '2022-03-11T10:11:22Z',
            value: 1456,
            trends: {
              duration: 7,
              span: {
                title: 'Prev 7 days',
                unit: '%',
                value: 30,
                direction: 'up',
              },
              median: {
                title: 'Prev 7 days',
                unit: '%',
                value: 33,
                direction: 'up',
              },
            },
          },
          {
            datetime: '2022-03-12T10:11:22Z',
            value: 126,
            trends: {
              duration: 7,
              span: {
                title: 'Prev 7 days',
                unit: '%',
                value: 30,
                direction: 'up',
              },
              median: {
                title: 'Prev 7 days',
                unit: '%',
                value: 33,
                direction: 'up',
              },
            },
          },
        ],
        gradientId: 'colorValue1',
      },
    ],
  };
  const eventOptions = [
    {
      datetime: '2022-03-10T10:11:22Z',
      title: 'Beyonce',
      id: 'a-v90as0b9',
      description: 'Some description',
      details: 'Some details',
    },
    {},
    {
      datetime: '2022-03-11T10:11:22Z',
      title: 'Jay-Z',
      id: 'b-fs20s0j2',
      description: 'Some description',
      details: 'Some details',
    },
  ];
  return (
    <BasicCard title={title} subheader={subtitle} action={action} sx={{ flex: 1, paddingBottom: '20px' }}>
      {/* <LineChart data={metrics} eventOptions={eventsOption.events} /> */}
      <LineChart data={histogramData2.data[0].values} eventOptions={eventOptions} />
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
