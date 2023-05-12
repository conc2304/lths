import { ChangeEvent } from 'react';

import { AccordionList } from '../../../../../elements';
import { QuickLinkProps } from '../../../types';
import QuickLinkToolbar from '../../quick-link/toolbar';

type Props = {
  data: QuickLinkProps[];
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, key: string) => void;
};
const QuickLinkListToolbar = ({ data, onChange }: Props) => {
  const renderItem = (link: QuickLinkProps, index: number) => {
    return <QuickLinkToolbar {...link} onChange={(e, key) => onChange(e, index, key)} />;
  };

  return <AccordionList items={data} renderItem={renderItem} titlePrefix="Quick Link" />;
};

export default QuickLinkListToolbar;
