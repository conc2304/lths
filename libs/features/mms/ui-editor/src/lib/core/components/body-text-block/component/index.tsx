import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import reactStringReplace from 'react-string-replace';

import { BodyTextComponentProps } from '../../types';

const BodyTextComponent = (props: BodyTextComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { title, card_background_color, text_size, text_color, linked_text },
  } = props;

  let replacedText: string | React.ReactNode[] = title;

  for (let i = 0; i < linked_text.length; i++) {
    const word = linked_text[i];

    const regex = new RegExp(`(${word.link_key})`, 'gi');

    replacedText = reactStringReplace(replacedText, regex, () => {
      return (
        <Link href={word.link_value} color={word.link_color}>
          {word.link_key}
        </Link>
      );
    });
  }

  return (
    <Box id={id} sx={{ backgroundColor: card_background_color, p: 2 }}>
      <Typography sx={{ fontSize: `${text_size}px`, color: text_color }}>{replacedText}</Typography>
    </Box>
  );
};
export default BodyTextComponent;
