import { ButtonGroup, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

type Props = {
  buttons: Array<{ label: string; onClick: () => void }>;
};

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  '& .MuiButtonBase-root': {
    border: '1px solid #D9D9D9',
    textTransform: 'uppercase',
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
    fontSize: '0.9rem',
    color: '#000',
    padding: '9px 12px',
    height: '34px',
    backgroundColor: 'transparent',
    transition: theme.transitions.create('background-color', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '&:hover': {
      backgroundColor: 'rgba(216, 216, 216, 0.4)',
    },
    '&.active': {
      background: '#e3f3ff',
    },
  },
  '& .MuiTouchRipple-child': {
    backgroundColor: '#e3f3ff',
  },
}));

export const LTHS_ButtonGroup = (props: Props) => {
  const { buttons } = props;

  const [activeIndex, setIsActiveIndex] = useState<number | null>(null);

  const handleOnClick = (onClickAction: () => void, index: number) => {
    setIsActiveIndex(index);
    onClickAction();
  };

  return (
    <StyledButtonGroup
      variant="outlined"
      disableElevation
      aria-label="outline button group"
    >
      {buttons.map((buttonItem, i) => {
        return (
          <Button
            className={activeIndex === i ? 'active' : ''}
            onClick={() => handleOnClick(buttonItem.onClick, i)}
          >
            {buttonItem.label}
          </Button>
        );
      })}
    </StyledButtonGroup>
  );
};
