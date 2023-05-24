import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';

import Navigator from './navigator';
import { NavigatorProps } from './navigator/container';
import { Toolbar, ToolbarProps } from './toolbar';
import { Wysiwyg } from './wysiwyg';
import colors from '../../common/colors';

type EditorProps = NavigatorProps & {
  onAddImageClick: ToolbarProps['onPropChange'];
};
const BlockEditor = ({ onAddComponentClick, onAddImageClick }: EditorProps) => {
  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="stretch" sx={{ height: '90vh' }}>
      <Grid item xs sx={{ backgroundColor: colors.sidebar.background }}>
        <Navigator onAddComponentClick={onAddComponentClick} />
      </Grid>

      <Grid item xs={6} sx={{ backgroundColor: colors.editor.background }}>
        <Stack justifyContent={'center'} flexDirection={'row'} flex={1} marginTop={5}>
          <Wysiwyg />
        </Stack>
      </Grid>
      <Grid item xs sx={{ backgroundColor: colors.sidebar }}>
        <Toolbar onPropChange={onAddImageClick} />
      </Grid>
    </Grid>
  );
};
export default BlockEditor;
