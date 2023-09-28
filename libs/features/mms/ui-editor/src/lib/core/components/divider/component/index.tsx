import { Divider } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { DividerProps } from '../../types';

const DividerComponent = (props: DividerProps) => {
  const {
    data: { color },
    __ui_id__: id,
  } = props;

  return (
    <BasicContainer id={id}>
      <Divider sx={{ bgcolor: color }} />
    </BasicContainer>
  );
};
export default DividerComponent;
