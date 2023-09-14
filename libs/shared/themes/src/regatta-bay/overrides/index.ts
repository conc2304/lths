import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles';

import Chip from './chip';
import DatePicker from './date-picker';
import DateTimePicker from './date-time-picker';
import Dialog from './dialog';
import Fab from './fab';
import Link from './link';
import Paper from './paper';
import Table from './table';
import TimePicker from './time-picker';
import ToggleButton from './toggle-button';
import ToggleButtonGroup from './toggle-button-group';
import Toolbar from './toolbar';

export default function getComponentOverrides(theme: Theme): Components {
  return {
    ...Chip(theme),
    ...DatePicker(theme),
    ...DateTimePicker(theme),
    ...Link(theme),
    ...Paper(theme),
    ...Table(theme),
    ...TimePicker(theme),
    ...ToggleButton(theme),
    ...ToggleButtonGroup(theme),
    ...Toolbar(theme),
    ...Dialog(),
    ...Fab(),
  };
}
