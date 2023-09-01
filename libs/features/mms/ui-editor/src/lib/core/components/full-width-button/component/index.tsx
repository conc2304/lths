import { Button } from '@mui/material';

import { BasicContainer } from '../../../../elements/containers';
import { FullWidthButtonComponentProps } from '../../types';

const FullWidthButtonComponent = (props: FullWidthButtonComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { label },
  } = props;

  return (
    <BasicContainer id={id} sx={{ backgroundColor: 'black', padding: 2 }}>
      <Button
        sx={{
          fontSize: '1.125rem',
          fontWeight: 500,
          backgroundColor: 'white',
          color: 'black',
          borderRadius: '2rem',
          paddingX: 4,
          paddingY: 2,
        }}
        fullWidth={true}
        variant="contained"
      >
        {label}
      </Button>
    </BasicContainer>
  );
};
export default FullWidthButtonComponent;
