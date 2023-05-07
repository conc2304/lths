import { Box } from '@mui/material';

import { ComponentProps, useEditorActions } from '../../../context';
import { componentFactory } from '../../factories';
export type Props = {
  components: ComponentProps[];
};
const mobileWidth = 375;
const mobileHeight = 812;
export default function Container() {
  const { components } = useEditorActions();
  return (
    <Box sx={{ border: 2, borderTop: 10, borderColor: 'gray' }}>
      <Box sx={{ width: mobileWidth }}>{components.map((component) => componentFactory(component))}</Box>
    </Box>
  );
}
