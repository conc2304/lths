import { FC, ReactNode, useMemo } from 'react';
import { Link } from '@mui/material';
import reactStringReplace from 'react-string-replace';

import { escapeRegExp } from '../../../utils';

type Props = {
  title: string;
  linked_text: { link_key: string; link_id: string }[];
  color?: string;
};

export const ReplacedTextComponent: FC<Props> = ({ title, linked_text, color }) => {
  const replacedText = useMemo(() => {
    let text: string | ReactNode[] = title;

    linked_text?.forEach(({ link_key, link_id }) => {
      const escapedLinkKey = escapeRegExp(link_key);
      const regex = new RegExp(`(${escapedLinkKey})`, 'g');
      text = reactStringReplace(text, regex, () => (
        <Link
          key={`link_${link_id}`}
          href="#"
          color={color}
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          {link_key}
        </Link>
      ));
    });
    return text;
  }, [title, linked_text, color]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{replacedText}</>;
};
