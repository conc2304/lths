import { Divider } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { DividerProps } from '../../types';

const DividerComponent = (props: DividerProps) => {
  const {
    data: { color },
    __ui_id__: id,
  } = props;
  console.log('color', color);
  return (
    <BasicContainer id={id} sx={{ padding: '10px 0px' }}>
      <Divider sx={{ bgcolor: color }} />
    </BasicContainer>
  );
};
export default DividerComponent;
