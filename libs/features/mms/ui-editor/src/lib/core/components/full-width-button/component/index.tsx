import { Button } from '@mui/material';

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
      border = '1px solid #636364';
      color = 'white';
      break;
    case 'BrandFill':
      variantStyle = 'contained';
      background = 'linear-gradient(180deg, #AD7C35 0%, #8D6834 66.67%, #785523 100%)';
      color = 'white';
      break;
    default:
      variantStyle = 'contained';
      background = 'white';
      color = 'black';
  }

  return (
    <BasicContainer id={id} sx={{ backgroundColor: 'black', padding: 2 }}>
      <Button
        sx={{
          fontSize: '1.125rem',
          fontWeight: 500,
          backgroundColor: { background },
          color: { color },
          border: { border },
          borderRadius: '2rem',
          paddingX: 4,
          paddingY: 2,
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
