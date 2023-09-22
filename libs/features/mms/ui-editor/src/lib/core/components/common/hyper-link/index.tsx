import { ChangeEvent } from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { ActionToolbar } from '..';
import BinIcon from '../../../../../assets/bin-icon.svg';
import { ToolbarProps } from '../../../../context';
import { ActionProps } from '../../types';

type HyperLinkToolbarProps = {
  index: number;
  link_id: string;
  link_key: string;
  action: ActionProps;
  onPropChange: ToolbarProps['onPropChange'];
  updateComponentProp: (key: string, value: string | object, index?: number, parent_key?: string) => void;
  onRemove: (link_id: string) => void;
  parent_key: string[] | undefined;
};

const HyperLinkToolbar = (props: HyperLinkToolbarProps) => {
  const { action, onPropChange, link_key, link_id, onRemove, index, parent_key, updateComponentProp } = props;
  const handleLinkText = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    updateComponentProp('link_key', e.target.value, index, 'linked_text');
  };
  return (
    <Box>
      <Stack spacing={2}>
        <Typography>Link Text {index + 1}</Typography>
        <TextField label={'Link Text'} value={link_key} onChange={handleLinkText} />
        <ActionToolbar action={action} onPropChange={onPropChange} isRadioButton index={index} keys={parent_key} />
        <Stack sx={{ justifyContent: 'center' }}>
          <Button
            variant="text"
            sx={{ fontSize: '14px', fontWeight: 500, textTransform: 'upperCase' }}
            startIcon={<img src={BinIcon} alt="Bin Icon" />}
            onClick={() => onRemove(link_id)}
          >
            Remove
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{ marginY: 3 }} />
    </Box>
  );
};

export default HyperLinkToolbar;
