import { Stack, Typography } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { TitleDescComponentProps } from '../../types';

export default function TitleDescComponent(props: TitleDescComponentProps) {
  const {
    __ui_id__: id,
    properties_data: { title, desc, color },
  } = props;

  return (
    <BasicContainer id={id}>
      <Stack flexDirection={'column'} justifyContent={'flex-start'} alignItems="flex-start">
        <Typography variant="h2" sx={{ fontWeight: 700, wordWrap: 'break-word' }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color={color}
          style={{
            paddingTop: 12,
          }}
        >
          {desc}
        </Typography>
      </Stack>
    </BasicContainer>
  );
}
