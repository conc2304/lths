import { ReactNode, useMemo } from 'react';
import { Box, Typography, Link } from '@mui/material';
import reactStringReplace from 'react-string-replace';

import { CenterHeadlineTextProps } from '../../types';

const CenterHeadlineText = (props: CenterHeadlineTextProps) => {
  const {
    __ui_id__: id,
    data: { title, linked_text = [] },
  } = props;

  const replacedSentence = useMemo(() => {
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
      <Typography sx={{ fontSize: '1.5rem', color: '#FFFFFF' }} variant="h3" align="center">
        {replacedSentence}
      </Typography>
    </Box>
  );
};

export default CenterHeadlineText;
