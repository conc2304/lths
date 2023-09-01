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
    data: { title, text_size },
  } = props;
  const fontSize = size.find((s) => s.value === text_size)?.fontSize;
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
          href={title}
          endIcon={<KeyboardArrowRightIcon sx={{ fontSize: fontSize, marginLeft: '-10px' }} />}
        >
          {title}
        </Button>
      </Stack>
    </BasicContainer>
  );
}

export default TextButtonComponent;
