import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles';

import AppBar from './app-bar';
import ButtonBase from './button-base';
import ButtonIcon from './button-icon';
import LoadingButton from './button-loading';
import Chip from './chip';
import DatePicker from './date-picker';
import DateTimePicker from './date-time-picker';
import Dialog from './dialog';
import Link from './link';
import Paper from './paper';
import Tab from './tab';
import Table from './table';
import TimePicker from './time-picker';
import ToggleButton from './toggle-button';
import ToggleButtonGroup from './toggle-button-group';
import Toolbar from './toolbar';
import TypogragphyOverrides from './typography';

export default function getComponentOverrides(theme: Theme): Components {
  return {
    ...AppBar(theme),
    ...ButtonBase(theme),
    ...ButtonIcon(theme),
    ...LoadingButton(),
    ...Chip(theme),
    ...DatePicker(theme),
    ...DateTimePicker(theme),
    ...Dialog(theme),
    ...Link(theme),
    ...Paper(theme),
    ...Tab(theme),
    ...Table(theme),
    ...TimePicker(theme),
    ...ToggleButton(theme),
    ...ToggleButtonGroup(theme),
    ...Toolbar(theme),
    ...TypogragphyOverrides(theme),
  };
}
