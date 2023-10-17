import { Typography } from '@mui/material';

import { Colors } from '../../../../../common';

type Props = {
  text: string;
  greyOut?: boolean;
};

const BoldText = (props: Props) => {
  const { text, greyOut = false } = props;

  const textColor = greyOut ? 'subText' : 'text';

  return (
    <Typography
      fontSize="3.5rem"
      fontWeight={500}
      letterSpacing="0.28px"
      textTransform="uppercase"
      color={Colors.editor[textColor]}
      lineHeight="3.5rem"
    >
      {text}
    </Typography>
  );
};

export default BoldText;
