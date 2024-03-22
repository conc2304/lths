import { ReactNode } from 'react';
import { IconButton, Stack, SxProps, Tooltip } from '@mui/material';

type ActionItem = {
  icon: ReactNode;
  action: string;
  title?: string;
  hide?: boolean;
};

type Props = {
  actions: ActionItem[];
  onActionClick: (action: string) => void;
  sx?: SxProps;
};

export const Actions = ({ onActionClick, actions, sx = {} }: Props) => {
  return (
    <Stack direction="row" sx={sx} spacing={1}>
      {actions.map(({ icon, action, title, hide = false }) => {
        const actionTitle = title ? title : action.toLowerCase();
        return (
          !hide && (
            <Tooltip key={action} title={actionTitle} arrow>
              <IconButton size='small' sx={{ padding: 0.5 }} onClick={() => onActionClick(action)}>{icon}</IconButton>
            </Tooltip>
          )
        );
      })}
    </Stack>
  );
};

export default Actions;
