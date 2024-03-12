import { DialogContent, InputLabel } from '@mui/material';
import { styled } from '@mui/system';

import { pxToRem } from '@lths/shared/utils';
// Custom Component Styles
export const fontStyle = {
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: pxToRem(13),
  lineHeight: pxToRem(16),
  letterSpacing: '0.15px',
  color: '#000',
};

export const FormLabel = styled(InputLabel)(({ theme }) => ({
  textTransform: 'uppercase',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: pxToRem(12),
  lineHeight: '266%',
  letterSpacing: '1px',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export const StyledDialogContent = styled(DialogContent)(() => ({
  px: pxToRem(24),
  py: 0,
}));

export const formGroupSX = { marginTop: pxToRem(16) };

export const dialogSubtitleText = 'All fields required unless noted.';
