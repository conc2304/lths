import { Box } from '@mui/material';

import { useEditorActions } from '../../../context';
import { toolbarFactory as factory } from '../../factories';

export default function Container() {
  const { selectedComponent } = useEditorActions();
  const renderComponent = () => {
    const component = factory(selectedComponent);
    return <Box>{component}</Box>;
  };

  if (selectedComponent) return renderComponent();
  else return <Box></Box>;
}
