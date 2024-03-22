import { ChangeEvent } from 'react';
import { MenuItem } from '@mui/material';

import { OutlinedTextField, ToolbarLabel } from '../../../../elements';
import { ToolPreviewContainer } from '../../common';
import { useToolbarChange } from '../../hooks';
import { GameCenterComponentProps } from '../../types';

const GameCenterToolbar = (props: GameCenterComponentProps) => {
  const {
    __ui_id__: id,
    data: { default_tab },
    onPropChange,
  } = props;

  const { updateComponentProp } = useToolbarChange();

  const handleDefaultTabChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponentProp('default_tab', event.target.value);
  };

  return (
    <ToolPreviewContainer onPropChange={onPropChange} id={id}>
      <ToolbarLabel label={'Game Center'} />
      <OutlinedTextField value={default_tab} onChange={handleDefaultTabChange} label="Default Tab" select>
        <MenuItem value={0}>Score</MenuItem>
        <MenuItem value={1}>Play By Play</MenuItem>
      </OutlinedTextField>
    </ToolPreviewContainer>
  );
};

export default GameCenterToolbar;
