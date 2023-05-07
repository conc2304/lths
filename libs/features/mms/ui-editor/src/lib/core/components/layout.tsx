import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { v4 as uuidv4 } from 'uuid';

import SortableList from './sortable-list';
import { SortableListProps } from './sortable-list/container';
import { Wysiwig } from './wysiwig';
import { useEditorActions } from '../../context/hooks';
const colors = {
  sidebar: '#D9D9D9',
  editor: '#f5f5f5',
};
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

      <Grid item xs={6} sx={{ backgroundColor: colors.editor }}>
        <Stack justifyContent={'center'} flexDirection={'row'} flex={1}>
          <Wysiwig />
        </Stack>
      </Grid>
      <Grid item xs sx={{ backgroundColor: colors.sidebar }}></Grid>
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
