import { Button, DialogActions, SxProps } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { pxToRem } from '@lths/shared/utils';

type CalendarDialogActionsProps = {
  cancelText: string;
  onCancel: () => void;
  confirmText: string;
  onSubmit?: () => void; // for when submit is not handled by form libs like Formik
  isSubmitting?: boolean;
  disabled?: boolean;
  sx?: SxProps;
};

export const CalendarDialogActions = (props: CalendarDialogActionsProps) => {
  const { cancelText, confirmText, isSubmitting, onCancel, disabled, onSubmit, sx = {} } = props;
  return (
    <DialogActions sx={{ pr: '1.5rem', pb: '2rem', ...sx }}>
      <Button sx={{ mr: pxToRem(8) }} onClick={onCancel} variant="outlined" color="primary">
        {cancelText}
      </Button>
      <LoadingButton
        loading={isSubmitting}
        disabled={disabled || isSubmitting}
        type="submit"
        variant="contained"
        color="primary"
        onClick={onSubmit ? onSubmit : undefined}
      >
        {confirmText}
      </LoadingButton>
    </DialogActions>
  );
};
