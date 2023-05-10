import { FC, MouseEvent } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';

export type SegmentedButtonProps = ToggleButtonGroupProps & {
  data: Record<string, string | number>[];
  onValueChange: (value: string) => void;
  value: string;
  label: string;
  keyProp?: string;
  valueProp?: string;
};
const defaultProps: Partial<SegmentedButtonProps> = {
  keyProp: 'key',
  valueProp: 'value',
};

const SegmentedButton: FC<SegmentedButtonProps> = ({
  data,
  onValueChange,
  value,
  label,
  keyProp,
  valueProp,
  ...rest
}) => {
  // const [value, setValue] = useState(null);

  const handleChange = (event: MouseEvent<HTMLElement>, value: string) => {
    // setValue(value);
    onValueChange(value);
  };

  if (!data) return null;
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="Toggle Group Button"
      //sx={sx}
      {...rest}
    >
      {Object.entries(data).map((item) => {
        const pair = item[1];
        return (
          <ToggleButton key={`toggle_btn_${pair[valueProp]}`} value={pair[valueProp]}>
            {pair[keyProp]}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};
SegmentedButton.defaultProps = defaultProps;
export default SegmentedButton;
