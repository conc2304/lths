import { IconButton, Stack } from '@mui/material';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import { NotificationActions } from './types';

const actions = [
  {
    icon: <EditIcon />,
    action: NotificationActions.EDIT,
  },
  {
    icon: <ContentCopyIcon />,
    action: NotificationActions.DUPLICATE,
  },
  {
    icon: <ArchiveOutlinedIcon />,
    action: NotificationActions.DELETE,
  },
  {
    icon: <PreviewOutlinedIcon />,
    action: NotificationActions.PREVIEW,
  },
  {
    icon: <ShowChartIcon />,
    action: NotificationActions.INSIGHTS,
  },
];

const EditorActions = () => {
  return (
    <Stack direction="row" marginLeft={3}>
      {actions.map(({ icon, action }) => (
        <IconButton key={action} title={action.toLowerCase()}>
          {icon}
        </IconButton>
      ))}
    </Stack>
  );
};

export default EditorActions;
