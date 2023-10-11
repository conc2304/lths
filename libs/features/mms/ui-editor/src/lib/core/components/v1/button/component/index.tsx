import { Button } from '@mui/material';

import { BasicContainer } from '../../../../../elements/containers';
import { ButtonComponentProps, ButtonStyle } from '../../../types';

const ButtonComponent = (props: ButtonComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, style },
  } = props;
  //TODO:make this generic??
  const variant = style === ButtonStyle.Fill ? 'contained' : 'outlined';
  return (
    <BasicContainer id={id}>
      <Button variant={variant}>{title}</Button>
    </BasicContainer>
  );
};
export default ButtonComponent;
