import { ReactNode, useMemo } from 'react';
import { Typography, Link } from '@mui/material';
import reactStringReplace from 'react-string-replace';

import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import { BodyTextComponentProps } from '../../types';
import { sizes } from '../utils';
const BodyTextComponent = (props: BodyTextComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, text_size, linked_text = [] },
  } = props;
  const { text: textColor } = colors.editor;
  const fontSize = sizes.find((s) => s.value === text_size)?.fontSize;

  const replacedText = useMemo(() => {
    let text: string | ReactNode[] = title;
    linked_text?.forEach(({ link_key, link_id }) => {
      const regex = new RegExp(`(${link_key})`, 'g');
      text = reactStringReplace(text, regex, () => {
        return (
          <Link key={`link_${link_id}`} href={'#'} color={textColor}>
            {link_key}
          </Link>
        );
      });
    });
    return text;
  }, [title, linked_text]);

  return (
    <BasicContainer id={id}>
      <Typography sx={{ fontSize: fontSize, color: textColor }}>{replacedText}</Typography>
    </BasicContainer>
  );
};
export default BodyTextComponent;
