import { ChangeEvent } from 'react';

import { QuickLinkProps } from '../../types';
import QuickLinkComponent from '../quick-link';
type Props = {
  data: QuickLinkProps[];
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, key: string) => void;
};
const QuickLinkListComponent = ({ data, onChange }: Props) => {
  return (
    <>
      {data.map((link: QuickLinkProps, index: number) => {
        return <QuickLinkComponent {...link} onChange={(e, key) => onChange(e, index, key)} />;
      })}
    </>
  );
};
export default QuickLinkListComponent;
