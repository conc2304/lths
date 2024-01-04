import { Stack } from '@mui/material';

import HeroEventEditor from './editor';
import { ToolContainer, ToolbarLabel } from '../../../../elements';
import { HeroEventComponentProps } from '../../types';

const HeroEventToolbar = (props: HeroEventComponentProps) => {
  const { __ui_id__: id } = props;

  return (
    <ToolContainer id={id}>
      <Stack spacing={2}>
        <ToolbarLabel label="Hero Event" />
        <HeroEventEditor />
      </Stack>
    </ToolContainer>
  );
};

export default HeroEventToolbar;
