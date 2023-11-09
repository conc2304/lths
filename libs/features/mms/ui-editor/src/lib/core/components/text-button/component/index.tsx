import { Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements/containers';
import { TextButtonProps } from '../../types';
import { sizes } from '../utils';

export function TextButtonComponent(props: TextButtonProps) {
  const {
    __ui_id__: id,
    data: { btn_text, btn_text_size },
  } = props;
  const fontSize = sizes.find((s) => s.value === btn_text_size)?.fontSize;
  return (
    <BasicContainer id={id}>
      <Button
        sx={{
          fontSize: fontSize,
          color: colors.editor.text,
          textDecoration: 'underline',
          padding: 0,
          textTransform: 'none',
        }}
        variant="text"
        href={btn_text}
        endIcon={
          <KeyboardArrowRightIcon sx={{ width: fontSize, height: fontSize, fontSize: fontSize, marginLeft: -1 }} />
        }
      >
        {btn_text}
      </Button>
    </BasicContainer>
  );
}

export default TextButtonComponent;
