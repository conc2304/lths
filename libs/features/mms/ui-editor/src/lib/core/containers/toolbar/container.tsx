import { Box } from '@mui/material';

import { useEditorActions, ToolbarProps } from '../../../context';
import { StickyContainer } from '../../../elements';
import { toolbarFactory as factory } from '../../factories';

export default function Container({ onPropChange }: ToolbarProps) {
  const { selectedComponent } = useEditorActions();

  const renderComponent = () => {
    const component = factory({ ...selectedComponent, onPropChange });
    return <StickyContainer>{component}</StickyContainer>;
  };

  if (selectedComponent) return renderComponent();
  else return <Box></Box>;
}
