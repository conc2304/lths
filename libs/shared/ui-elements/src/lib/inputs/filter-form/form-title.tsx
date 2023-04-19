import { ReactNode } from 'react';
import { DialogTitle, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface DialogTitleProps {
  id: string;
  children?: ReactNode;
  onClose: () => void;
}

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 400,
  lineHeight: '2.625rem',
  marginRight: theme.spacing(1.5),
  letterSpacing: '0.15px',
  pt: 0,
  mb: theme.spacing(3.375),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[600],
  position: 'absolute',
  top: theme.spacing(3.875),
  right: theme.spacing(2.5),
}));

export const FormTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <StyledDialogTitle {...other}>
      {children}
      {onClose ? (
        <StyledIconButton aria-label="close" onClick={onClose} size="large">
          <CloseIcon sx={{ fontSize: '2.188rem' }} />
        </StyledIconButton>
      ) : null}
    </StyledDialogTitle>
  );
};
