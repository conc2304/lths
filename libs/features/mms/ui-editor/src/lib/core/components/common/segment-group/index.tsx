import { Box, Button, Divider, TextField } from '@mui/material';
import { Stack } from '@mui/system';

import { ActionToolbar } from '..';
import BinIcon from '../../../../../assets/bin-icon.svg';
import { ToolbarProps } from '../../../../context';
import { GroupLabel } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { ActionProps } from '../../types';

type SegmentGroupToolbarProps = {
  index: number;
  title: string;
  description: string;
  action: ActionProps;
  segment_id: string;
  onPropChange: ToolbarProps['onPropChange'];
  onRemove: (segment_id: string) => void;
  parent_key: string[];
};
const SegmentToolbar = (props: SegmentGroupToolbarProps) => {
  const { title, description, action, onPropChange, onRemove, index, parent_key, segment_id } = props;
  const { handleDescriptionChange, handleTitleChange } = useToolbarChange();

  return (
    <Box>
      <Stack spacing={2}>
        <GroupLabel label={`Segment Group ${index + 1}`} />
        <TextField label={'Title'} value={title} onChange={(event) => handleTitleChange(event, index, parent_key)} />
        <TextField
          label={'Description'}
          value={description}
          onChange={(event) => handleDescriptionChange(event, index, parent_key)}
        />
        <ActionToolbar action={action} onPropChange={onPropChange} isRadioButton index={index} keys={parent_key} />
        <Stack sx={{ justifyContent: 'center' }}>
          <Button
            variant="text"
            sx={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'upperCase' }}
            startIcon={<img src={BinIcon} alt="Bin Icon" />}
            onClick={() => onRemove(segment_id)}
          >
            Remove
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{ marginY: 3 }} />
    </Box>
  );
};

export default SegmentToolbar;
