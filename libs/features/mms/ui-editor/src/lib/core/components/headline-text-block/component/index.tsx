import { ReactNode, useMemo } from 'react';
import { Typography, Link } from '@mui/material';
import reactStringReplace from 'react-string-replace';

import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import { HeadlineTextBlockComponentProps } from '../../types';
import { sizes } from '../utils';

const HeadlineTextBlockComponent = (props: HeadlineTextBlockComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, text_size, linked_text = [] },
  } = props;
  const fontSize = sizes.find((s) => s.value === text_size)?.fontSize;

  const replacedSentence = useMemo(() => {
    let text: string | ReactNode[] = title;
    linked_text?.forEach(({ link_key, link_id }) => {
      const regex = new RegExp(`(${link_key})`, 'g');
      text = reactStringReplace(text, regex, () => {
        return (
          <Link key={`link_${link_id}`} href={'#'} color={colors.editor.text}>
            {link_key}
          </Link>
        );
      });
    });
    return text;
  }, [title, linked_text]);

  return (
    <BasicContainer id={id}>
      <Typography sx={{ fontSize: fontSize, color: colors.editor.text }} variant="h3">
        {replacedSentence}
      </Typography>
    </BasicContainer>
  );
};
export default HeadlineTextBlockComponent;
