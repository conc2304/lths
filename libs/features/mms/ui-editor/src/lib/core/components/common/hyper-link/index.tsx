import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Stack } from '@mui/system';

import { ActionToolbar } from '..';
import { ToolbarProps } from '../../../../context';
import { ActionProps } from '../../types';

type HyperLinkToolbarProps = {
  link_number: number;
  link_id: string;
  link_key: string;
  action: ActionProps;
  onPropChange: ToolbarProps['onPropChange'];
  onRemove: (link_id: string) => void;
};

const HyperLinkToolbar = (props: HyperLinkToolbarProps) => {
  const { action, onPropChange, link_number, link_key, link_id, onRemove } = props;
  return (
    <Box>
      <Stack spacing={2}>
        <Typography>Link Text {link_number}</Typography>
        <TextField label={'Link Text'} value={link_key} />
        <ActionToolbar action={action} onPropChange={onPropChange} isRadioButton />
        <Stack sx={{ justifyContent: 'center' }}>
          <Button
            variant="text"
            sx={{ fontSize: '14px', fontWeight: 500, textTransform: 'upperCase' }}
            startIcon={<DeleteOutlineIcon />}
            onClick={() => onRemove(link_id)}
          >
            Remove
          </Button>
        </Stack>
        <Divider />
      </Stack>
    </Box>
  );
};

export default HyperLinkToolbar;
