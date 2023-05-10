import { Box } from '@mui/material';

import Editor from './editor';
import colors from '../../../common/colors';
import { ComponentProps, useEditorActions } from '../../../context';
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
      <Box sx={{ backgroundColor: colors.editor.phone.header, height: 55, width: '100%' }} />
      <Box
        sx={{
          width: mobileWidth,
          //border: `solid 1px ${colors.editor.phone.background}`,
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
