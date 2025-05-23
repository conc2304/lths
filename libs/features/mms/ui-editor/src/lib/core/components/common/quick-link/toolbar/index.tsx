import { ChangeEvent } from 'react';

import { BasicContainer, BasicTextField } from '../../../../../elements';
import { QuickLinkProps } from '../../../types';

type Props = QuickLinkProps & {
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => void;
};

const QuickLinkToolbar = ({ icon, title, onChange }: Props) => {
  return (
    <BasicContainer marginBottom={2} sx={{ margin: 0 }}>
      <BasicTextField label={'Title'} value={title} onChange={(e) => onChange(e, 'title')} />
      <BasicTextField label={'Icon URL'} value={icon} onChange={(e) => onChange(e, 'icon')} />
    </BasicContainer>
  );
};
export default QuickLinkToolbar;
