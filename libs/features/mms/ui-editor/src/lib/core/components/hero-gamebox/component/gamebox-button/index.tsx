import { Icon, SxProps } from '@mui/material';

import { Colors } from '../../../../../common';
import { ReadOnlyButton as Button } from '../../../../../elements'

type Props = {
  btnText: string;
  iconSrc?: string;
  sx?: SxProps;
};

const GameboxButton = (props: Props) => {
  const { btnText, sx = {}, iconSrc } = props;

  return (
    <Button
      sx={{
        border: `1px solid ${Colors.button.border}`,
        borderRadius: 5,
        paddingY: 1.25,
        paddingX: 2.5,
        color: Colors.editor.text,
        fontWeight: 500,
        fontSize: '0.875rem',
        textTransform: 'none',
        lineHeight: '20px',
        ...sx,
      }}
      startIcon={
        iconSrc && (
          <Icon>
            <img src={iconSrc} alt="button start icon" />
          </Icon>
        )
      }
    >
      {btnText}
    </Button>
  );
};

export default GameboxButton;
