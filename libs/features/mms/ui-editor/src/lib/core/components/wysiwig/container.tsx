import { Box } from '@mui/material';

import { ComponentProps, useEditorActions } from '../../../context';
import { componentFactory } from '../../factories';
export type Props = {
  components: ComponentProps[];
};
export default function Container() {
  const { components } = useEditorActions();
  return <Box>test{components.map((component) => componentFactory(component))}</Box>;
}
