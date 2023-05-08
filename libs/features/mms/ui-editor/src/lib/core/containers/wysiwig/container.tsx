import { Box, BoxProps, styled } from '@mui/material';

import { ComponentProps, useEditorActions } from '../../../context';
import Editor from '../../editor-highlighter';
import { componentFactory } from '../../factories';
export type Props = {
  components: ComponentProps[];
};
const mobileWidth = 375;
const mobileHeight = 812;
const BoxStyled = styled(Box)(({ theme }) => ({
  borderColor: '#6D7278 ', //theme.palette.primary.main,
  borderWidth: 5,
  borderTopWidth: 40,
  borderStyle: 'solid',
}));
function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

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
      <Box sx={{ backgroundColor: '#6D7278', height: 55, width: '100%' }} />
      <Box sx={{ width: mobileWidth, border: 'solid 1px #D9D9D9', borderTopWidth: 0 }}>
        <Editor components={components} />
      </Box>
      <Box sx={{ backgroundColor: '#D9D9D9', height: 55, width: '100%', marginTop: 'auto' }}></Box>
    </Box>
  );
}
