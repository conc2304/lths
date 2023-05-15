import { BasicContainer, BasicTextField } from '../../../../elements';
import ColorPicker from '../../../../elements/color-picker';
import { useToolbarChange } from '../../hooks';
import { HeaderComponentProps } from '../../types';

const HeaderToolbar = (props: HeaderComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { color = '#000000', title },
  } = props;

  const { handleTitleChange, updateComponentProp } = useToolbarChange();

  const handleColorChange = (color: string) => {
    updateComponentProp('color', color);
  };

  return (
    <BasicContainer id={`${id}_toolbar`}>
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <ColorPicker initialColor={color} onChange={handleColorChange} />
    </BasicContainer>
  );
};
export default HeaderToolbar;
