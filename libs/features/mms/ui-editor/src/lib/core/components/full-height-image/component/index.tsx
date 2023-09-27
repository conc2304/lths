import { CardMedia } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { FullHeightImageComponentProps } from '../../types';

const FullHeightImageComponent = (props: FullHeightImageComponentProps) => {
  const {
    data: { image },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id}>
      <CardMedia component="img" image={image} alt="Image" sx={{ height: 224, borderRadius: 2.5 }} />
    </BasicContainer>
  );
};

export default FullHeightImageComponent;
