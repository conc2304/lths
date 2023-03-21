import { ButtonGroup, Button } from '@mui/material';
import { useState } from 'react';
import { ButtonGroupProps } from '@mui/material/ButtonGroup';

type Props = {
  buttons: Array<{
    label: string;
    value: string | number;
    onClick: (value: string | number) => void;
  }>;
} & ButtonGroupProps;

export const LthsButtonGroup = ({
  color = 'info',
  variant = 'outlined',
  ...rest
}: Props) => {
  const { buttons, sx } = rest;

  const [activeIndex, setIsActiveIndex] = useState<number | null>(null);

  const handleOnClick = (
    onClickHandler: (value: string | number) => void,
    buttonValue: string | number,
    index: number
  ) => {
    setIsActiveIndex(index);
    onClickHandler(buttonValue);
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
            value={buttonItem.value}
            aria-label="button"
            onClick={(e) =>
              handleOnClick(buttonItem.onClick, buttonItem.value, i)
            }
            key={buttonItem.label}
          >
            {buttonItem.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
