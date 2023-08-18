import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import reactStringReplace from 'react-string-replace';

import { BodyTextComponentProps } from '../../types';
import { size } from '../utils';
const BodyTextComponent = (props: BodyTextComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { title, text_size, linked_text },
  } = props;

  let replacedText: string | React.ReactNode[] = title;

  for (let i = 0; i < linked_text.length; i++) {
    const word = linked_text[i];

    const regex = new RegExp(`(${word.link_key})`, 'gi');

    replacedText = reactStringReplace(replacedText, regex, () => {
      return (
        <Link href={word.link_value} color={'#ffffff'}>
          {word.link_key}
        </Link>
      );
    });
  }

  return (
    <Box id={id} sx={{ backgroundColor: 'black', p: 2 }}>
      <Typography sx={{ fontSize: size.find((s) => s.value === text_size).fontSize, color: 'white' }}>
        {replacedText}
      </Typography>
    </Box>
  );
};
export default BodyTextComponent;
