import { Typography } from '@mui/material';

import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import { ReplacedTextComponent } from '../../common/replaced-text';
import { CenterBodyTextBlockProps } from '../../types';
import { sizes } from '../utils';

const CenterBodyTextBlock = (props: CenterBodyTextBlockProps) => {
  const {
    __ui_id__: id,
    data: { title, text_size, linked_text = [] },
  } = props;
  const { text: textColor } = colors.editor;
  const fontSize = sizes.find((s) => s.value === text_size)?.fontSize;
  return (
    <BasicContainer id={id}>
      <Typography
        sx={{
          fontSize: fontSize,
          color: textColor,
          fontWeight: '400',
          lineHeight: '24px',
          textAlign: 'center',
        }}
      >
        <ReplacedTextComponent title={title} linked_text={linked_text} color={textColor} />
      </Typography>
    </BasicContainer>
  );
};

export default CenterBodyTextBlock;
