import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';

import Navigator from './navigator';
import { NavigatorProps } from './navigator/container';
import { Toolbar } from './toolbar';
import { Wysiwig } from './wysiwig';
import colors from '../../common/colors';

export const GridContainer = ({ onAddComponentClick }: NavigatorProps) => {
  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="stretch" sx={{ height: '90vh' }}>
      <Grid item xs sx={{ backgroundColor: colors.sidebar.background }}>
        <Navigator onAddComponentClick={onAddComponentClick} />
      </Grid>

      <Grid item xs={6} sx={{ backgroundColor: colors.editor.background }}>
        <Stack justifyContent={'center'} flexDirection={'row'} flex={1} marginTop={5}>
          <Wysiwig />
        </Stack>
      </Grid>
      <Grid item xs sx={{ backgroundColor: colors.sidebar }}>
        <Toolbar />
      </Grid>
    </Grid>
  );
};
