import React from 'react';
import { Typography } from '@mui/material';

import { ComponentProps } from '../../../../context';
import { ToolContainer } from '../../../../elements';

const Toolbar: React.FC<ComponentProps> = (props) => {
  const { __ui_id__: id, component_id, name } = props;

  return (
    <ToolContainer id={id}>
      <Typography sx={{ fontWeight: 600 }}>
        `{component_id || name}` component has not been implemented yet.
      </Typography>
    </ToolContainer>
  );
};
export default Toolbar;
