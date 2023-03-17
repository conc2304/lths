import { ButtonGroup, Button, Typography, Color } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { ButtonGroupProps } from '@mui/material/ButtonGroup';

type Props = {
  buttons: Array<{ label: string; onClick: () => void }>;
} & ButtonGroupProps;


export const LthsButtonGroup = ({
  color = 'primary',
  variant = 'outlined',
  ...rest
}: Props) => {
  const { buttons, sx } = rest;

  const [activeIndex, setIsActiveIndex] = useState<number | null>(null);

  const handleOnClick = (onClickHandler: () => void, index: number) => {
    setIsActiveIndex(index);
    onClickHandler();
  };

  return (
    <ButtonGroup
      variant={variant}
      color={color}
      disableElevation
      aria-label="outline button group"
      sx={sx}
    >
      {buttons.map((buttonItem, i) => {
        return (
          <Button
            className={activeIndex === i ? 'active' : ''}
            onClick={() => handleOnClick(buttonItem.onClick, i)}
            key={buttonItem.label}
          >
            {buttonItem.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
