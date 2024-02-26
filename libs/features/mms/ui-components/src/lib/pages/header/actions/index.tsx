import { PageAction } from '@lths/features/mms/ui-editor';

import { Actions } from '../../../common';

type Action = {
  icon: JSX.Element;
  action: PageAction;
  hide?: boolean;
};

type Props = {
  actions: Action[];
  onActionClick: (action: string) => void;
};

export const PageActions = ({ actions, onActionClick }: Props) => {
  return <Actions actions={actions} onActionClick={onActionClick} sx={{ marginLeft: 1 }} />;
};
