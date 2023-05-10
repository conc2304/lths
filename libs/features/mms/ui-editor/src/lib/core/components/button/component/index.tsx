import React from 'react';
import { Button } from '@mui/material';

import { BasicContainer } from '../../../../elements/containers';
import { ButtonComponentProps, ButtonStyle } from '../../types';

const ButtonComponent: React.FC<ButtonComponentProps> = (props) => {
  const {
    __ui_id__: id,
    default_data: { title, style },
  } = props;
  //TODO:make this generic??
  const variant = style === ButtonStyle.Fill ? 'contained' : 'outlined';
  return (
    <BasicContainer id={`${id}_component`}>
      <Button variant={variant}>{title}</Button>
    </BasicContainer>
  );
};
export default ButtonComponent;
