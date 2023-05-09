import DrawerContent from './content';
import { LayoutDrawerContentProps } from './types';
import SimpleBar from '../../../../components/simple-bar';

import 'simplebar-react/dist/simplebar.min.css';

const DrawerScrollBarContent = ({ sections }: LayoutDrawerContentProps) => {
  return (
    <SimpleBar
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <DrawerContent sections={sections} />
    </SimpleBar>
  );
};

export default DrawerScrollBarContent;
