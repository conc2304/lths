import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

type Props = { header?: string; children: React.ReactNode };

const DrawerSectionList = ({ header, children }: Props) => {
  const subheader = header ? (
    <ListSubheader component="div" id="nested-list-subheader" data-testid="Dashoard-drawer--list-subheader">
      {header}
    </ListSubheader>
  ) : null;

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={subheader}
      disablePadding
    >
      {children}
    </List>
  );
};
export default DrawerSectionList;
