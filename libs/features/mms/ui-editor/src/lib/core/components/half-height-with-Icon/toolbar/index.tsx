import { ToolbarLabel, OutlinedTextField, GroupLabel, SimpleImagePicker } from '../../../../elements';
import { ToolContainer } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { HalfHeightWithIconProps } from '../../types';

const HalfHeightWithIconToolbar = (props: HalfHeightWithIconProps) => {
  const {
    __ui_id__: id,
    data: { title, icon, description, action, icon_alt_text },
    onPropChange,
  } = props;

  const { updateComponentProp, handleTitleChange } = useToolbarChange();

  return (
    <ToolContainer id={id}>
      <ToolbarLabel label={'Component'} />
      <SimpleImagePicker
        value={icon}
        onChange={(value) => updateComponentProp('icon', value)}
        onReplace={onPropChange}
      />
      <OutlinedTextField
        label={'Icon alt text'}
        value={icon_alt_text}
        onChange={(e) => updateComponentProp('icon_alt_text', e.target.value)}
      />
      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <OutlinedTextField
        label={'Description'}
        value={description}
        onChange={(e) => updateComponentProp('description', e.target.value)}
      />
      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolContainer>
  );
};
export default HalfHeightWithIconToolbar;
