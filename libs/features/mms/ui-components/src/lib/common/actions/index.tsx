import { ReactNode } from 'react';
import { IconButton, Stack, SxProps, Tooltip } from '@mui/material';

type ActionItem = {
  icon: ReactNode;
  action: string;
  title?: string;
};

type Props = {
  actions: ActionItem[];
  onActionClick: (action: string) => void;
  sx?: SxProps;
};

export const Actions = ({ onActionClick, actions, sx = {} }: Props) => {
  return (
    <Stack direction="row" sx={sx}>
      {actions.map(({ icon, action, title }) => {
        const actionTitle = title ? title : action.toLowerCase();
        return (
          <Tooltip key={action} title={actionTitle} arrow>
            <IconButton onClick={() => onActionClick(action)}>{icon}</IconButton>
          </Tooltip>
        );
      })}
    </Stack>
  );
};

export default Actions;
