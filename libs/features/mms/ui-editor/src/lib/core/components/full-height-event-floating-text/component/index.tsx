import { Box, CardMedia, Typography } from '@mui/material';

import placeholder from '../../../../../assets/placeholder_3_2.svg';
import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import { FullHeightEventFloatingTextComponentProps } from '../../types';

const FloatingHeightEventFloatingTextcomponent = (props: FullHeightEventFloatingTextComponentProps) => {
  const { __ui_id__: id } = props;
  return (
    <BasicContainer id={id}>
      <Box>
        <CardMedia component="img" height="192" image={placeholder} alt={'placeholder'} sx={{ borderRadius: 2.5 }} />
        <Typography sx={{ color: colors.editor.text, fontWeight: 450 }} marginTop={1.5}>
          Event Title
        </Typography>
        <Typography sx={{ color: colors.editor.subText }}>Event Date Time</Typography>
      </Box>
    </BasicContainer>
  );
};

export default FloatingHeightEventFloatingTextcomponent;
