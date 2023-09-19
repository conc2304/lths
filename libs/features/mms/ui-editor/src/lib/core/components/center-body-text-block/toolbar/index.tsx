import React from 'react';
import { Stack } from '@mui/system';

import { BasicContainer, GroupLabel, OutlinedTextField } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { CenterBodyTextBlockProps } from '../../types';

const CenterBodyTextBlockToolbar = (props: CenterBodyTextBlockProps) => {
  const {
    __ui_id__: id,
    data: { title },
  } = props;
  const { handleTitleChange } = useToolbarChange();

  return (
    <BasicContainer id={id}>
      <Stack spacing={2}>
        <GroupLabel label={'Text'} />
        <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      </Stack>
    </BasicContainer>
  );
};

export default CenterBodyTextBlockToolbar;
