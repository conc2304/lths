import { IconButton, Stack, Tooltip } from '@mui/material';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';

// import { NotificationAction } from '@lths/features/mms/ui-notifications';

export enum NotificationAction {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  DUPLICATE = 'DUPLICATE',
  ARCHIVE = 'ARCHIVE',
  PREVIEW = 'PREVIEW',
  INSIGHTS = 'INSIGHTS',
  PUSH = 'PUSH',
}

const actions = [
  {
    icon: <EditIcon />,
    action: NotificationAction.EDIT,
  },
  {
    icon: <ContentCopyIcon />,
    action: NotificationAction.DUPLICATE,
  },
  {
    icon: <ArchiveOutlinedIcon />,
    action: NotificationAction.ARCHIVE,
  },
  {
    icon: <PreviewOutlinedIcon />,
    action: NotificationAction.PREVIEW,
  },
  {
    icon: <ShowChartIcon />,
    action: NotificationAction.INSIGHTS,
  },
];

const EditorActions = ({ onActionClick }) => {
  return (
    <Stack direction="row" marginLeft={3}>
      {actions.map(({ icon, action }) => (
        <Tooltip key={action} title={action.toLowerCase()} arrow>
          <IconButton onClick={() => onActionClick(action)}>{icon}</IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
};

export default EditorActions;
