import { Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';

import { Colors } from '@lths/features/mms/ui-editor';
import { MenuButton } from '@lths/shared/ui-elements';
import { PageHeader as Header } from '@lths/shared/ui-layouts';

import { PageActions } from './actions';
import { PagesStatus } from './status';
import PublishIcon from '../../assets/Publish.svg';
import { PageStatus } from '../types';

type Props = {
  onStatusChange: (status: string) => void;
  onActionClick: (action: string) => void;
  onUpdate: () => void;
  status: string;
  title: string;
  isPageUpdating: boolean;
  lastUpdatedOn: string;
};

export const PageHeader = ({
  onStatusChange,
  onActionClick,
  title = 'Page name',
  status,
  onUpdate,
  isPageUpdating = false,
  lastUpdatedOn,
}: Props) => {
  const setNotificationStatusSent = () => {
    onStatusChange(PageStatus.PUBLISHED);
  };

  const menuItems = [
    {
      id: PageStatus.PUBLISHED,
      label: 'PUBLISH NOW',
      action: () => onStatusChange(PageStatus.PUBLISHED),
    },
    {
      id: PageStatus.UNPUBLISHED,
      label: 'UNPUBLISH',
      action: () => onStatusChange(PageStatus.UNPUBLISHED),
    },
  ];

  const saveBtnColor = Colors.saveButton.color;

  const statusInfoText = lastUpdatedOn ? new Date(lastUpdatedOn).toLocaleDateString() : '';

  return (
    <Header
      sx={{ my: 1 }}
      title={title}
      leftContent={
        <Stack direction="row" spacing={2.5}>
          <PageActions onActionClick={onActionClick} />
          <LoadingButton
            variant="outlined"
            startIcon={<SaveIcon />}
            sx={{
              paddingY: 0.5,
              paddingX: 1.25,
              borderRadius: 1,
              border: `1px solid ${saveBtnColor}`,
              color: saveBtnColor,
              letterSpacing: '0.46px',
              fontWeight: 500,
            }}
            onClick={onUpdate}
            loading={isPageUpdating}
          >
            SAVE
          </LoadingButton>
        </Stack>
      }
      rightContent={
        <Stack direction="row" alignItems="center" spacing={2}>
          <PagesStatus status={status} statusInfo={statusInfoText} />
          <MenuButton
            startIcon={<img src={PublishIcon} alt="publish icon" width={24} height={24} />}
            buttonText="PUBLISH"
            buttonAction={setNotificationStatusSent}
            items={menuItems}
          />
        </Stack>
      }
    />
  );
};
