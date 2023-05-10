import { ChangeEvent } from 'react';

import { useEditorActions } from '../../../../context';
import { BasicContainer, BasicTextField } from '../../../../elements';
import ColorPicker from '../../../../elements/color-picker';
import { HeaderComponentProps } from '../../types';

const HeaderToolbar = (props: HeaderComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { color = '#000000', title },
  } = props;

  const { selectComponent } = useEditorActions();

  const updateComponenetProp = (key: string, value: string) => {
    const data = { ...props, default_data: { ...props.default_data, [key]: value } };
    selectComponent(data);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponenetProp('title', event.target.value);
  };
  const handleColorChange = (color: string) => {
    updateComponenetProp('color', color);
  };

  return (
    <BasicContainer id={`${id}_toolbar`}>
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <ColorPicker initialColor={color} onChange={handleColorChange} />
    </BasicContainer>
  );
};
export default HeaderToolbar;
