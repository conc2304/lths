import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import reactStringReplace from 'react-string-replace';

import { HeadlineTextBlockComponentProps } from '../../types';
import { size } from '../utils';
//TODO: use react memo or state for generating link  texts
const HeadlineTextBlockComponent = (props: HeadlineTextBlockComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { title, text_size, linked_text },
  } = props;
  const fontSize = size.find((s) => s.value === text_size)?.fontSize;
  let replacedsentence: string | React.ReactNode[] = title;

  for (let i = 0; i < linked_text.length; i++) {
    const word = linked_text[i];
    const regex = new RegExp(`(${word.link_key})`, 'gi');
    replacedsentence = reactStringReplace(replacedsentence, regex, () => {
      return (
        <Link key={`link_${0}`} href={word.link_value} color="#FFFFFF">
          {word.link_key}
        </Link>
      );
    });
  }

  return (
    <Box id={id} sx={{ backgroundColor: 'black', p: 2 }}>
      <Typography sx={{ fontSize: fontSize, color: '#FFFFFF' }} variant="h3">
        {replacedsentence}
      </Typography>
    </Box>
  );
};
export default HeadlineTextBlockComponent;
