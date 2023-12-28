import React, { CSSProperties } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

export type SelectableIconButtonProps = ButtonProps & {
  readOnly?: boolean;
};

const ReadOnlyButton = ({ readOnly = true, sx, ...rest }: SelectableIconButtonProps) => {

  const readOnlyStyle: CSSProperties = readOnly && {
    pointerEvents: 'none',
    userSelect: 'none',
    cursor: 'default',
  }

  return (
    <Button sx={{...readOnlyStyle, ...sx}} {...rest}/>
  );
};

export default ReadOnlyButton;