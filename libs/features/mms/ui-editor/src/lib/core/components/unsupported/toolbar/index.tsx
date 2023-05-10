import React from 'react';
import { Typography } from '@mui/material';

import { ComponentProps } from '../../../../context';
import { CardContainer } from '../../../../elements';

const Toolbar: React.FC<ComponentProps> = (props) => {
  const { __ui_id__: id, component_id, component_name } = props;

  return (
    <CardContainer id={`${id}_toolbar`}>
      <Typography sx={{ fontWeight: 600 }}>
        `{component_id || component_name}` component has not been implemented yet.
      </Typography>
    </CardContainer>
  );
};
export default Toolbar;
