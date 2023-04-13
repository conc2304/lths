import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles';

import DatePicker from './date-picker';
import Link from './link';
import Paper from './paper';
import ToggleButton from './toggle-button';
import ToggleButtonGroup from './toggle-button-group';
import Toolbar from './toolbar';
import Typography from './typography';

export default function getComponentOverrides(theme: Theme): Components {
  return {
    ...Toolbar(theme),
    ...DatePicker(theme),
    ...ToggleButton(theme),
    ...ToggleButtonGroup(theme),
    ...Typography(theme),
    ...Paper(theme),
    ...Link(theme),
  };
}
