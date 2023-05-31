import { Box } from '@mui/material';

import Editor from './editor';
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
      }}
    >
      <Box sx={{ backgroundColor: colors.editor.phone.header, height: 55, width: '100%' }} />
      <Box
        sx={{
          width: MOBILE_SCREEN_WIDTH,
          backgroundColor: colors.editor.phone.background,
          borderTopWidth: 0,
        }}
      >
        <Editor components={components} />
      </Box>
      <Box sx={{ backgroundColor: colors.editor.phone.header, height: 55, width: '100%', marginTop: 'auto' }}></Box>
    </Box>
  );
}
