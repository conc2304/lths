import { Typography } from '@mui/material';

import { ToolbarLabel } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';

const ExternalDataViewToolbar = (props: { id: string; title: string; desc: string }) => {
  const { id, title, desc } = props;

  return (
    <ToolContainer id={id}>
      <ToolbarLabel label={title} />
      <Typography color="textSecondary" sx={{ fontSize: '0.875rem' }}>
        {desc}
      </Typography>
    </ToolContainer>
  );
};
export default ExternalDataViewToolbar;
