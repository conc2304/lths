import { ToolContainer, ColorTextField, BasicTextField, ActionAccordion } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { HeaderComponentProps } from '../../types';

const HeaderToolbar = (props: HeaderComponentProps) => {
  const {
    __ui_id__: id,
    data: { color = '#000000', title, desc, action },
  } = props;

  const { handleTitleChange, handleDescChange, handleActionChange, updateComponentProp } = useToolbarChange();

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
      <ActionAccordion handleActionChange={handleActionChange} action={action} />
    </ToolContainer>
  );
};
export default HeaderToolbar;
