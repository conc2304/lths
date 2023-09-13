import { Typography } from '@mui/material';

import { ToolbarLabel } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';

const ExternalDataToolbar = (props: { id: string; title: string; desc: string; component_id: string }) => {
  const { id, title, desc, component_id } = props;

  return (
    <ToolContainer id={id} aria-label={component_id + ' Toolbar'}>
      <ToolbarLabel label={title} />
      <Typography color="textSecondary" sx={{ fontSize: 14 }}>
        {desc}
      </Typography>
    </ToolContainer>
  );
};
export default ExternalDataToolbar;
