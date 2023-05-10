import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';

import SortableList from './navigator';
import { SortableListProps } from './navigator/container';
import { Toolbar } from './toolbar';
import { Wysiwig } from './wysiwig';
import colors from '../../common/colors';

export const GridContainer = ({ onAddComponentClick }: SortableListProps) => {
  /*uconst { initEditor, addComponent, components } = useEditorActions();
  console.log('🚀 ~ file: layout.tsx:16 ~ GridContainer ~ components:', components);
  seEffect(() => {
    initEditor([
      { id: '1', name: 'Hero Card', __ui_id__: '1', type: 'qCardView' },
      { id: '1', name: 'Quick Links', __ui_id__: '2', type: 'cQuickLinkView' },
      { id: '1', name: 'Button', __ui_id__: '3', type: 'cButton' },
      { id: '1', name: 'Card View', __ui_id__: '4', type: 'qCardView' },
    ]);
  }, []);
  const handleAddComponentClick = () => {
    const id = uuidv4();
    addComponent({ id, name: 'Card View', __ui_id__: id, type: 'qCardView' });
    console.log('handleTabChange');
  };*/
  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="stretch" sx={{ height: '90vh' }}>
      <Grid item xs sx={{ backgroundColor: colors.sidebar }}>
        <SortableList onAddComponentClick={onAddComponentClick} />
      </Grid>

      <Grid item xs={6} sx={{ backgroundColor: colors.editor, overflowY: 'scroll' }}>
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
/*
export default function ThreeColumnContainer() {
  return (
    <EditorProvider>
      <GridContainer />
    </EditorProvider>
  );
}
*/
