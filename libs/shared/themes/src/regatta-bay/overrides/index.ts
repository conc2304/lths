import Toolbar from './toolbar';
import DatePicker from './date-picker';
import ToggleButton from './toggle-button';
import ToggleButtonGroup from './toggle-button-group';

import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles';

export default function getComponentOverrides(theme: Theme): Components {
  return {
    ...Toolbar(theme),
    ...DatePicker(theme),
    ...ToggleButton(theme),
    ...ToggleButtonGroup(theme),
  };
}
