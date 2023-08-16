import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';

import { DropdownButton } from '@lths/shared/ui-elements';
import { PageHeader as Header } from '@lths/shared/ui-layouts';

import { PageStatus } from './types';

type Props = {
  onStatusChange: (status: string) => void;
  status: string;
  title: string;
};
export const PageStatusColor = {
  [PageStatus.DRAFT]: '#FF9900',
  [PageStatus.PUBLISHED]: '#00810D',
};

const StatusLabel = ({ status }: { status: string }) => {
  const color = PageStatusColor[status];
  const label = PageStatus[status];
  return (
    <Box sx={{ fontSize: '15px', mt: 2, ml: 3 }}>
      <Typography color={color}>{label}</Typography>
    </Box>
  );
};
export const PageHeader = ({ onStatusChange, title = 'Page Name', status }: Props) => {
  const menuItems = [
    {
      id: PageStatus.PUBLISHED,
      name: 'PUBLISH NOW',
      action: () => {
        onStatusChange(PageStatus.PUBLISHED);
      },
    },
    {
      id: PageStatus.UNPUBLISHED,
      name: 'UNPUBLISH',
      action: () => {
        onStatusChange(PageStatus.UNPUBLISHED);
      },
    },
  ];

  return (
    <Header
      title={title}
      rightContent={<DropdownButton buttonText="PUBLISH" menuItems={menuItems} />}
      leftContent={<StatusLabel status={status} />}
      sx={{ mt: 2, mb: 1 }}
    />
  );
};
