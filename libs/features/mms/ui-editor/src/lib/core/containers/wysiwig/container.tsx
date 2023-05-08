import { Box } from '@mui/material';

import colors from '../../../colors';
import { ComponentProps, useEditorActions } from '../../../context';
import Editor from '../../editor-highlighter';
export type Props = {
  components: ComponentProps[];
};
const mobileWidth = 375;
const mobileHeight = 812;

export default function Container() {
  const { components } = useEditorActions();
  return (
    <Box
      sx={{
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
        minHeight: mobileHeight,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ backgroundColor: colors.editor.header, height: 55, width: '100%' }} />
      <Box sx={{ width: mobileWidth, border: `solid 1px ${colors.editor.background}`, borderTopWidth: 0 }}>
        <Editor components={components} />
      </Box>
      <Box sx={{ backgroundColor: colors.editor.background, height: 55, width: '100%', marginTop: 'auto' }}></Box>
    </Box>
  );
}
