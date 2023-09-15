import { Stack, Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// eslint-disable-next-line import/order
import { BasicContainer } from '../../../../elements/containers';

/* eslint-disable-next-line */
import { TextButtonProps } from '../../types';
import { size } from '../utils';

export function TextButtonComponent(props: TextButtonProps) {
  const {
    __ui_id__: id,
    data: { btn_text, btn_text_size },
  } = props;
  const fontSize = size.find((s) => s.value === btn_text_size)?.fontSize;
  return (
    <BasicContainer id={id} sx={{ backgroundColor: '#000000', alignItems: 'center' }}>
      <Stack>
        <Button
          sx={{
            fontSize: fontSize,
            padding: '13px 19px',
            color: '#FFFFFF',
            textDecoration: 'underline',
            justifyContent: 'left',
          }}
          variant="text"
          href={btn_text}
          endIcon={<KeyboardArrowRightIcon sx={{ fontSize: fontSize, marginLeft: '-10px' }} />}
        >
          {btn_text}
        </Button>
      </Stack>
    </BasicContainer>
  );
}

export default TextButtonComponent;
