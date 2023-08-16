import { Box, Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Grid';

import Navigator from './navigator';
import { NavigatorProps } from './navigator/container';
import { Toolbar, ToolbarProps } from './toolbar';
import { Wysiwyg } from './wysiwyg';
import colors from '../../common/colors';

type EditorProps = NavigatorProps & {
  onAddImageClick: ToolbarProps['onPropChange'];
  onUpdateClick: () => void;
};

const BlockEditor = ({ onAddComponentClick, onAddImageClick, onUpdateClick }: EditorProps) => {
  return (
    <Box>
      <Grid container direction="row" justifyContent="space-between" alignItems="stretch" sx={{ height: '90vh' }}>
        <Grid item xs sx={{ backgroundColor: colors.sidebar.background }}>
          <Navigator onAddComponentClick={onAddComponentClick} />
        </Grid>

        <Grid item xs={6} sx={{ backgroundColor: colors.editor.background }}>
          <Stack justifyContent={'center'} flexDirection={'row'} flex={1} marginTop={5}>
            <Wysiwyg />
          </Stack>
        </Grid>
        <Grid item xs sx={{ backgroundColor: colors.sidebar, padding: 2 }}>
          <Toolbar onPropChange={onAddImageClick} />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent={'flex-end'} padding={2}>
            <Button variant="outlined" sx={{ marginRight: 2 }}>
              CANCEL
            </Button>
            <LoadingButton variant="contained" loading={false} onClick={onUpdateClick}>
              SAVE
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
export default BlockEditor;
