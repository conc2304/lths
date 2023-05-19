import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { PagesPreviewResponse, Preview } from '@lths/features/mms/data-access';
import { BasicCard, InfoTooltip, PreviewCard } from '@lths/shared/ui-elements';

import previewLogo from '../../../assets/preview.svg';

type Props = {
  data: PagesPreviewResponse;
};
const CardItem = ({ data }: { data: Preview }) => {
  const { title, subtitle, entryData, exitData, info } = data;
  const action = info && <InfoTooltip title={''} description={info.description} action={{ url: info.url }} />;
  return (
    <BasicCard title={title} subheader={subtitle} action={action} sx={{ flex: 1, paddingBottom: '20px' }}>
      <Stack direction="row" justifyContent="space-between" spacing={3}>
        <Stack direction="column" justifyContent="center" spacing={3}>
          <Typography variant="h4">Entry Pages</Typography>
          {entryData.map((o, i) => {
            return (
              <PreviewCard
                key={`card_preview_entry_data${i}`}
                title={o.title}
                hero={o.value}
                span={o.span}
                median={o.median}
              />
            );
          })}
        </Stack>
        <Stack justifyContent="space-around" sx={{ marginX: '18rem !important' }}>
          <img src={previewLogo} alt="preview-logo" />
        </Stack>
        <Stack direction="column" justifyContent="center" spacing={3}>
          <Typography variant="h4">Exit Pages</Typography>
          {exitData.map((o, i) => {
            return (
              <PreviewCard
                key={`card_preview_exit_data${i}`}
                title={o.title}
                hero={o.value}
                span={o.span}
                median={o.median}
              />
            );
          })}
        </Stack>
      </Stack>
    </BasicCard>
  );
};

export const PreviewContainer = ({ data }: Props) => {
  if (!data || !data.data) return null;
  return <CardItem key={`preview_card}`} data={data.data} />;
};
