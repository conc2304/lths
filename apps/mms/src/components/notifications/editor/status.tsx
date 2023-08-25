import { useCallback } from 'react';
import { Typography, Stack } from '@mui/material';

import { DraftLogo, PublishLogo } from '@lths/assets';

import { NotificationStatus } from './types';

type Props = {
  status: string;
};

const Status = ({ status }: Props) => {
  const renderStatus = useCallback(() => {
    switch (status) {
      case NotificationStatus.DRAFT:
        return (
          <>
            <img src={DraftLogo} alt="draft" />
            <Typography color="#FB8C00">Draft</Typography>
          </>
        );
      case NotificationStatus.SENT:
        return (
          <>
            <img src={PublishLogo} alt="sent" />
            <Typography color="#388E3C">Sent</Typography>
          </>
        );
    }
  }, [status]);

  return (
    <Stack direction="row" spacing={0.5}>
      {renderStatus()}
    </Stack>
  );
};

export default Status;
