import { ToolContainer, ColorTextField, BasicTextField } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { HeaderComponentProps } from '../../types';

const HeaderToolbar = (props: HeaderComponentProps) => {
  const {
    __ui_id__: id,
    data: { color = '#000000', title, desc, action },
    onPropChange,
  } = props;

  const { handleTitleChange, handleDescChange, updateComponentProp } = useToolbarChange();

  const handleColorChange = (color: string) => {
    updateComponentProp('color', color);
  };

  return (
    <ToolContainer id={id}>
      <ColorTextField
        label={'Title'}
        value={title}
        onChange={handleTitleChange}
        colorValue={color}
        onColorChange={handleColorChange}
      />
      <BasicTextField label={'Description'} value={desc} onChange={handleDescChange} />
      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolContainer>
  );
};
export default HeaderToolbar;
