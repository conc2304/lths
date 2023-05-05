import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import SortableList from './sortable-list';
import { EditorProvider } from '../../context';
const colors = {
  sidebar: '#D9D9D9',
  editor: '#f5f5f5',
};
export const GridContainer = () => {
  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="stretch">
      <Grid item xs sx={{ backgroundColor: colors.sidebar }}>
        <SortableList />
      </Grid>
      <Grid item xs={6} sx={{ backgroundColor: colors.editor }}></Grid>
      <Grid item xs sx={{ backgroundColor: colors.sidebar }}></Grid>
    </Grid>
  );
};
export default function ThreeColumnContainer() {
  return (
    <EditorProvider>
      <GridContainer />
    </EditorProvider>
  );
}
