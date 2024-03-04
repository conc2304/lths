import { Box } from '@mui/material';

import { useEditorActions, ToolbarProps } from '../../../context';
import { toolbarFactory as factory } from '../../factories';
import { PAGE_EDITOR_CONTAINER, PAGE_EDITOR_TOOLBAR_CONTAINER } from '../constants';

export default function Container({ onPropChange }: ToolbarProps) {
  const { selectedComponent } = useEditorActions();

  const renderComponent = () => {
    const component = factory({ ...selectedComponent, onPropChange });
    return <Box id={PAGE_EDITOR_TOOLBAR_CONTAINER} className={PAGE_EDITOR_CONTAINER}>
              {component}
            </Box>;
  };

  if (selectedComponent) return renderComponent();
  else return <Box className={PAGE_EDITOR_CONTAINER}></Box>;
}
