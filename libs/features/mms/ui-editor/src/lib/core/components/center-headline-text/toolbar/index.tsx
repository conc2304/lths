import React from 'react';
import { Stack } from '@mui/system';

import { BasicContainer, GroupLabel, OutlinedTextField } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { CenterHeadlineTextProps } from '../../types';

const CenterHeadlineTextToolbar = (props: CenterHeadlineTextProps) => {
  const {
    __ui_id__: id,
    data: { title },
  } = props;
  const { handleTitleChange } = useToolbarChange();

  return (
    <BasicContainer id={id}>
      <Stack spacing={2}>
        <GroupLabel label={'Headline'} />
        <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      </Stack>
    </BasicContainer>
  );
};

export default CenterHeadlineTextToolbar;
