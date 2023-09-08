import { Box } from '@mui/material';

import Editor from './editor';
import { MobileBar } from './mobile';
import { MOBILE_SCREEN_WIDTH, MOBILE_SCREEN_HEIGHT } from '../../../common';
import colors from '../../../common/colors';
import { ComponentProps, useEditorActions } from '../../../context';

export type Props = {
  components: ComponentProps[];
};

export default function Container() {
  const { components } = useEditorActions();
  return (
    <Box
      sx={{
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
        minHeight: MOBILE_SCREEN_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.editor.mobile.background,
      }}
    >
      <Box
        sx={{
          width: MOBILE_SCREEN_WIDTH,
          backgroundColor: colors.editor.mobile.background,
          borderTopWidth: 0,
        }}
      >
        <MobileBar.Status />
        <Editor components={components} />
      </Box>
      <MobileBar.Bottom />
    </Box>
  );
}
