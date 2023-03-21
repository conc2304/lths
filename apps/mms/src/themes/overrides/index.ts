import Toolbar from './toolbar';
import ButtonGroup from './button-group';
import DatePicker from './date-picker';

import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles';

export default function getComponentOverrides(theme: Theme): Components {
    return { ...Toolbar(theme), ...ButtonGroup(theme), ...DatePicker(theme)}
}
