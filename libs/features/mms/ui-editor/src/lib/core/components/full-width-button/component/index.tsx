import { Button } from '@mui/material';

import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements/containers';
import { FullWidthButtonComponentProps } from '../../types';
const FullWidthButtonComponent = (props: FullWidthButtonComponentProps) => {
  const {
    __ui_id__: id,
    data: { btn_text, btn_style },
  } = props;
  type VariantStyle = 'outlined' | 'contained';

  let variantStyle: VariantStyle = 'contained';
  let background = 'white';
  let color = 'black';
  let border = '';

  switch (btn_style) {
    case 'SecondaryOutline':
      variantStyle = 'outlined';
      background = '';
      border = `1px solid ${colors.button.border}`;
      color = 'white';
      break;
    case 'BrandFill':
      variantStyle = 'contained';
      background = colors.button.brand;
      color = 'white';
      break;
    default:
      variantStyle = 'contained';
      background = 'white';
      color = 'black';
  }

  return (
    <BasicContainer id={id}>
      <Button
        sx={{
          fontSize: '1.125rem',
          fontWeight: 500,
          backgroundColor: { background },
          color: { color },
          border: { border },
          borderRadius: '2rem',
          paddingY: 1.5,
          '&:hover': {
            backgroundColor: { background },
            color: { color },
          },
          textTransform: 'none',
        }}
        fullWidth
        variant={variantStyle}
      >
        {btn_text}
      </Button>
    </BasicContainer>
  );
};
export default FullWidthButtonComponent;
