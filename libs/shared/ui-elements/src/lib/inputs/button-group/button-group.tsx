import { ButtonGroup, Button } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { ButtonGroupProps } from '@mui/material/ButtonGroup';

type Props = {
  buttons: Array<{
    label: string;
    value: string | number;
    onClick?: (value: string | number) => void;
  }>;
  onOptionSelected: (value: string | number) => void;
  value: string | number | null;
} & ButtonGroupProps;

export const LthsButtonGroup = ({
  color = 'info',
  variant = 'outlined',
  value: groupValue = null,
  ...rest
}: Props) => {
  const { buttons, sx, onOptionSelected, ...buttonGroupProps } = rest;

  const [activeIndex, setIsActiveIndex] = useState<number | null>();

  useEffect(() => {
    setIsActiveIndex(buttons.findIndex((b) => b.value === groupValue));
  }, [groupValue, buttons]);


  const handleOnClick = ({
    value,
    i,
    onClick,
  }: {
    value: string | number;
    i: number;
    onClick?: (value: string | number) => void;
  }) => {
    setIsActiveIndex(i);
    onOptionSelected(value);
    !!onClick && onClick(value);
  };

  return (
    <ButtonGroup
      variant={variant}
      color={color}
      disableElevation
      aria-label="outline button group"
      sx={sx}
      {...buttonGroupProps}
    >
      {buttons.map((buttonItem, i) => {
        const { onClick, value, label } = buttonItem;
        return (
          <Button
            className={activeIndex === i ? 'active' : ''}
            aria-label="button"
            onClick={(e) => handleOnClick({ value, i, onClick })}
            key={label}
          >
            {label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
