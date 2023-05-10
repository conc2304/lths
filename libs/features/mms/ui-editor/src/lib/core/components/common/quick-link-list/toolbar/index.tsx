import { ChangeEvent } from 'react';

import { QuickLinkProps } from '../../../types';
import QuickLinkToolbar from '../../quick-link/toolbar';

type Props = {
  data: QuickLinkProps[];
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, key: string) => void;
};

const QuickLinkListToolbar = ({ data, onChange }: Props) => {
  return (
    <>
      {data.map((link: QuickLinkProps, index: number) => {
        return <QuickLinkToolbar {...link} onChange={(e, key) => onChange(e, index, key)} />;
      })}
    </>
  );
};
export default QuickLinkListToolbar;
