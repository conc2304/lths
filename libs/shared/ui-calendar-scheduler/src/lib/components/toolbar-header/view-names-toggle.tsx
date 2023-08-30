import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { upperFirst } from 'lodash';
import { Messages, View } from 'react-big-calendar';

import { pxToRem } from '@lths/shared/utils';

import { LTHSView } from '../../types';

export type ViewNamesGroupProps = {
  messages: Messages;
  onView: (view: View) => void;
  view: LTHSView;
  views: LTHSView[];
};
export const ViewNamesGroup = (props: ViewNamesGroupProps) => {
  const { views: viewNames, view, messages, onView } = props;

  return (
    <Box className="Calendar-UI--viewname-group" display="flex" alignContent="center" justifyContent="space-between">
      <ToggleButtonGroup
        value={view}
        color="secondary"
        exclusive
        aria-label="Calendar View Mode Selector"
        className="Lths-Button-Group"
      >
        {viewNames.map((name) => {
          const isSelected = view === name;
          return (
            <ToggleButton
              value={name}
              onClick={() => onView(name as View)}
              role="button"
              key={name}
              aria-label={name}
              aria-pressed={isSelected}
              data-testid={`Calendar-View-Control--view--${name}`}
              sx={{
                fontSize: pxToRem(12),
                textTransform: 'none',
                py: '0px',
                fontWeight: isSelected ? 'bold' : 'normal',
              }}
            >
              {upperFirst(messages[name as View])}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Box>
  );
};
