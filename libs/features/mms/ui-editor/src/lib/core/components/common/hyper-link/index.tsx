import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { ActionToolbar } from '..';
import BinIcon from '../../../../../assets/bin-icon.svg';
import { ToolbarProps } from '../../../../context';
import { ActionProps } from '../../types';

type HyperLinkToolbarProps = {
  index: number;
  link_number: number;
  link_id: string;
  link_key: string;
  action: ActionProps;
  onPropChange: ToolbarProps['onPropChange'];
  updateComponentProp: (key: string, value: string | object, index?: number, parent_key?: string) => void;
  onRemove: (link_id: string) => void;
  parent_key: string[] | undefined;
};

const HyperLinkToolbar = (props: HyperLinkToolbarProps) => {
  const { action, onPropChange, link_number, link_key, link_id, onRemove, index, parent_key, updateComponentProp } =
    props;
  console.log('action', action);
  return (
    <Box>
      <Stack spacing={2}>
        <Typography>Link Text {link_number}</Typography>
        <TextField
          label={'Link Text'}
          value={link_key}
          onChange={(e) => {
            updateComponentProp('link_key', e.target.value, index, 'linked_text');
          }}
        />
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
      <Divider sx={{ margin: '24px 0' }} />
    </Box>
  );
};

export default HyperLinkToolbar;
