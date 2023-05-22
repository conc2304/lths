import PagesIcon from '@mui/icons-material/DocumentScanner';

import { SectionItemProps } from '../../routes/types';

const section:SectionItemProps = {
    items: [
        {
            title: 'Pages',
            icon: <PagesIcon />,
            path: '/pages',
            file: '/pages'
        }
    ]
}

export default section;