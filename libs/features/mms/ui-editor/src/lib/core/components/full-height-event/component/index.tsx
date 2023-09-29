import { useMemo } from 'react';
import { Stack, Typography } from '@mui/material';

import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import FullHeightItem from '../../common/full-height-item';
import { FullHeightEventComponentProps } from '../../types';

const FullHeightEventComponent = (props: FullHeightEventComponentProps) => {
  const {
    __ui_id__: id,
    data: { max_size, title, btn_text },
  } = props;

  const eventComponents = useMemo(() => {
    const components = [];
    for (let i = 0; i < Number(max_size); i++) {
      components.push(
        <FullHeightItem
          key={`fullHeightItem_${i}`}
          title="Martin Madden on Ducks 2023 Draft"
          description="June 29, 2023"
          image="https://devblobstorageacc.blob.core.windows.net/files-lths-dev/original/images/PremiumDiningJD_3_2.png"
        />
      );
    }
    return components;
  }, [max_size]);

  return (
    <BasicContainer id={id}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={4}>
        <Typography fontSize="1.5rem" fontWeight={500} color={colors.editor.text}>
          {title}
        </Typography>
        <Typography fontSize="0.875rem" fontWeight={400} color={colors.editor.smallText}>
          {btn_text}
        </Typography>
      </Stack>
      <Stack spacing={2} direction="row" sx={{ flexWrap: 'nowrap', overflowX: 'hidden' }}>
        {eventComponents}
      </Stack>
    </BasicContainer>
  );
};

export default FullHeightEventComponent;
