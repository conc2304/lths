import { ToolContainer, GroupLabel, ColorPicker } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { DividerProps } from '../../types';

const DividerToolbar = (props: DividerProps) => {
  const {
    data: { color },
    __ui_id__: id,
  } = props;
  const { handleColorChange } = useToolbarChange();

  return (
    <ToolContainer id={id} aria-label="Divider Toolbar">
      <GroupLabel label={'Divider'} />
      <ColorPicker label="color" value={color} onChange={handleColorChange} />
    </ToolContainer>
  );
};
export default DividerToolbar;
