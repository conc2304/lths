import { ReactNode, useMemo } from 'react';
import { Box, Typography, Link } from '@mui/material';
import reactStringReplace from 'react-string-replace';

import { HeadlineTextBlockComponentProps } from '../../types';
import { size } from '../utils';

const HeadlineTextBlockComponent = (props: HeadlineTextBlockComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, text_size, linked_text },
  } = props;
  const fontSize = size.find((s) => s.value === text_size)?.fontSize;

  const replacedsentence = useMemo(() => {
    let text: string | ReactNode[] = title;
    linked_text?.forEach(({ link_key, link_id }) => {
      const regex = new RegExp(`(${link_key})`, 'g');
      text = reactStringReplace(text, regex, () => {
        return (
          <Link key={`link_${link_id}`} href={'#'} color="#FFFFFF">
            {link_key}
          </Link>
        );
      });
    });
    return text;
  }, [title, linked_text]);

  return (
    <Box id={id} sx={{ backgroundColor: 'black', p: 2 }}>
      <Typography sx={{ fontSize: fontSize, color: '#FFFFFF' }} variant="h3">
        {replacedsentence}
      </Typography>
    </Box>
  );
};
export default HeadlineTextBlockComponent;
