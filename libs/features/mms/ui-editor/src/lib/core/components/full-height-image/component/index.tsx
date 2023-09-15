import { Card, CardMedia } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { FullHeightImageComponentProps } from '../../types';

const FullHeightImageComponent = (props: FullHeightImageComponentProps) => {
  const {
    data: { image },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id}>
      <Card sx={{ width: 345, height: 224, borderRadius: '10px' }}>
        <CardMedia component="img" image={image} alt="Image" />
      </Card>
    </BasicContainer>
  );
};

export default FullHeightImageComponent;
