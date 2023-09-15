import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import { PageAction } from '@lths/features/mms/ui-editor';

import { Actions } from '../../../common';

const actions = [
  {
    icon: <EditIcon />,
    action: PageAction.RENAME,
  },
  {
    icon: <ContentCopyIcon />,
    action: PageAction.DUPLICATE,
  },
  {
    icon: <ArchiveOutlinedIcon />,
    action: PageAction.DELETE,
  },
  {
    icon: <PreviewOutlinedIcon />,
    action: PageAction.PREVIEW,
  },
  {
    icon: <ShowChartIcon />,
    action: PageAction.INSIGHTS,
  },
  {
    icon: <LinkIcon />,
    action: PageAction.SHARE,
  },
];

type Props = {
  onActionClick: (action: string) => void;
};

export const PageActions = ({ onActionClick }: Props) => {
  return <Actions actions={actions} onActionClick={onActionClick} sx={{ marginLeft: 3 }} />;
};
