import { useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useContainerScroll } from '@lths-mui/shared/ui-hooks';

import { scrollToAnElementInAContainer } from '@lths/shared/ui-elements';

import {
  PAGE_EDITOR_CONTAINER,
  PAGE_EDITOR_CONTAINER_SCROLL,
  PAGE_EDITOR_NAVIGATOR_CONTAINER,
  PAGE_EDITOR_WYSIWYG_CONTAINER,
} from './constants';
import Navigator from './navigator';
import { NavigatorProps } from './navigator/container';
import { Toolbar } from './toolbar';
import { Wysiwyg } from './wysiwyg';
import colors from '../../common/colors';
import { ToolbarProps, useEditorActions } from '../../context';

import './index.scss';

type EditorProps = NavigatorProps & {
  onPropChange: ToolbarProps['onPropChange'];
};

const BlockEditor = ({ onAddComponent, onPropChange }: EditorProps) => {
  useContainerScroll([`.${PAGE_EDITOR_CONTAINER}`], [PAGE_EDITOR_CONTAINER_SCROLL]);

  const { selectedComponent } = useEditorActions();

  useEffect(() => {
    if (selectedComponent) {
      const { __ui_id__ } = selectedComponent;
      scrollToAnElementInAContainer(`#${PAGE_EDITOR_WYSIWYG_CONTAINER}`, `#editor-component-${__ui_id__}`);
      scrollToAnElementInAContainer(`#${PAGE_EDITOR_NAVIGATOR_CONTAINER}`, `#navigator-component-${__ui_id__}`);
    }
  }, [selectedComponent]);

  return (
    <Box>
      <Grid container>
        <Grid item xs={3.5} sx={{ backgroundColor: colors.sidebar.background }}>
          <Navigator onAddComponent={onAddComponent} />
        </Grid>

        <Grid item xs={5} sx={{ backgroundColor: colors.editor.background }}>
          <Stack
            justifyContent={'center'}
            flexDirection={'row'}
            flex={1}
            className={PAGE_EDITOR_CONTAINER}
            id={PAGE_EDITOR_WYSIWYG_CONTAINER}
          >
            <Wysiwyg />
          </Stack>
        </Grid>
        <Grid item xs={3.5} sx={{ backgroundColor: colors.sidebar, padding: 2 }}>
          <Toolbar onPropChange={onPropChange} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default BlockEditor;
