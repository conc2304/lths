import DrawerSection from './drawer-content-details';
import { LayoutDrawerSectionProps } from './types';
import SimpleBar from '../../../components/simple-bar';

import 'simplebar-react/dist/simplebar.min.css';

const DrawerScrollBarContent = ({ sections }: LayoutDrawerSectionProps) => {
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

export default DrawerScrollBarContent;
