import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import { NotificationAction } from '@lths/features/mms/ui-notifications';

import { Actions } from '../../../common';

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

type Props = {
  onActionClick: (action: string) => void;
};

export const NotificationActions = ({ onActionClick }: Props) => {
  return <Actions actions={actions} onActionClick={onActionClick} sx={{ marginLeft: 3 }} />;
};
