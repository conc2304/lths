import Toolbar from './toolbar';
import ButtonGroup from './button-group';

export default function getOverrides(theme) {
    return { ...Toolbar(theme), ...ButtonGroup(theme) }
}
