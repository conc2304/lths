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
  ...fontStyle,
  textTransform: 'uppercase',
  marginBottom: theme.spacing(1),
}));

export const StyledDialogContent = styled(DialogContent)(() => ({
  padding: pxToRem(24),
}));

export const formGroupSX = { marginTop: pxToRem(16) };

export const dialogSubtitleText = 'All fields required unless noted.';
