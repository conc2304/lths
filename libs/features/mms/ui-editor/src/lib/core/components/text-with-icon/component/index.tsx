import { Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { BasicContainer } from '../../../../elements';
import { TextWithIconProps } from '../../types';

const TextwithIcon = (props: TextWithIconProps) => {
  const {
    data: { icon, title },
    __ui_id__: id,
  } = props;
  console.log('textWithIcon', props);
  return (
    <BasicContainer id={id}>
      <Typography variant="subtitle1" gutterBottom>
        <LocationOnIcon />
        {icon}
        {title}
      </Typography>
    </BasicContainer>
  );
};

export default TextwithIcon;
