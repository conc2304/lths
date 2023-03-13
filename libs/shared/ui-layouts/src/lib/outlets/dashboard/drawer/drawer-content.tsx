import 'simplebar-react/dist/simplebar.min.css';

import DrawerSection from './drawer-content-details';
import SimpleBar from '../../../components/simple-bar';

import { LayoutDrawerSectionProps } from './types';

const DrawerContent = ({ sections }: LayoutDrawerSectionProps) => {
  return (
    <SimpleBar
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <DrawerSection sections={sections} />
    </SimpleBar>
  );
};

export default DrawerContent;
