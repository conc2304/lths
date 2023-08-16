import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import reactStringReplace from 'react-string-replace';

import { HeadlineTextBlockComponentProps } from '../../types';
//TODO: use react memo or state for generating link  texts
const HeadlineTextBlockComponent = (props: HeadlineTextBlockComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { card_background_color, title, text_size, text_color, linked_text },
  } = props;

  let replacedsentence: string | React.ReactNode[] = title;

  for (let i = 0; i < linked_text.length; i++) {
    const word = linked_text[i];
    const regex = new RegExp(`(${word.link_key})`, 'gi');
    replacedsentence = reactStringReplace(replacedsentence, regex, () => {
      return (
        <Link key={`link_${0}`} href={word.link_value} color={word.link_color}>
          {word.link_key}
        </Link>
      );
    });
  }

  return (
    <Box id={id} sx={{ backgroundColor: card_background_color, p: 2 }}>
      <Typography sx={{ fontSize: `${text_size}px`, color: text_color }} variant="h3">
        {replacedsentence}
      </Typography>
    </Box>
  );
};
export default HeadlineTextBlockComponent;
