import { Stack } from '@mui/material';

import { GroupLabel, OutlinedTextField, ToolContainer, ToolbarLabel } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { FullHeightEventComponentProps } from '../../types';

const FullHeightEventToolbar = (props: FullHeightEventComponentProps) => {
  const {
    __ui_id__: id,
    data: { max_size, title, btn_text, source_type },
  } = props;

  const { handleTitleChange, handleButtonTextChange } = useToolbarChange();

  return (
    <ToolContainer id={id}>
      <Stack spacing={2}>
        <ToolbarLabel label="Full Height Event" />
        <GroupLabel label={'Text'} />
        <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
        <OutlinedTextField label={'Button Text'} value={btn_text} onChange={handleButtonTextChange} />
      </Stack>
    </ToolContainer>
  );
};

export default FullHeightEventToolbar;
