import Toolbar from './toolbar';
import ButtonGroup from './button-group';
import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles';

export default function getComponentOverrides(theme: Theme): Components {
    return { ...Toolbar(theme), ...ButtonGroup(theme)}
}
