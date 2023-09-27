import { CardMedia, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import { FullHeightFloatingTextProps } from '../../types';

const FullHeightFloatingTextComponent = (props: FullHeightFloatingTextProps) => {
  const {
    __ui_id__: id,
    data: { title, image, description },
  } = props;
  const { text, subText } = colors.editor;

  return (
    <BasicContainer id={id}>
      <Stack spacing={1.25}>
        <CardMedia component="img" height="224" width="335" image={image} alt={title} sx={{ borderRadius: 2.5 }} />
        <Typography variant="h5" sx={{ color: text, fontWeight: 450 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: subText, fontSize: '1rem' }}>
          {description}
        </Typography>
      </Stack>
    </BasicContainer>
  );
};

export default FullHeightFloatingTextComponent;
