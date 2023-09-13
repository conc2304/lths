import { Box } from '@mui/material';

import { SpacerProps } from '../../types';

const SpacerComponent = (props: SpacerProps) => {
  const {
    data: { space },
    __ui_id__: id,
  } = props;
  return <Box id={id} height={`${space}px`} bgcolor={'black'}></Box>;
};
export default SpacerComponent;
