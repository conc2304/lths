import { UnsupportedToolbar } from '../..';
import { BasicTextField, ToolContainer, ImagePicker } from '../../../../elements';
import { ColorPicker } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { ComponentProps } from '../../types';

enum FormControl {
  Image = 'image',
  Title = 'title',
  Description = 'desc',
  Color = 'color',
}

const GenericToolbar = (props: ComponentProps) => {
  console.log('props', props.component_id, Object.getOwnPropertyNames(props.properties_data));

  const { __ui_id__: id, properties_data, onPropChange } = props;

  const { handleImageChange, handleTitleChange, handleDescChange, handleColorChange } = useToolbarChange();

  const formFactory = (key: string) => {
    switch (key) {
      case FormControl.Image:
        return <ImagePicker value={properties_data.image} onChange={handleImageChange} onReplace={onPropChange} />;
      case FormControl.Title:
        return <BasicTextField label={'Title'} value={properties_data.title} onChange={handleTitleChange} />;
      case FormControl.Description:
        return <BasicTextField label={'Description'} value={properties_data.desc} onChange={handleDescChange} />;
      case FormControl.Color:
        return <ColorPicker label="Color" value={properties_data.color} onChange={handleColorChange} />;

      default:
        return null;
    }
  };

  const renderComponent = () => {
    const keys = Object.getOwnPropertyNames(props.properties_data);
    const controls = keys.map((key) => {
      return formFactory(key);
    });

    if (!controls || controls.filter((o) => o !== null).length === 0) return <UnsupportedToolbar {...props} />;
    else return controls;
  };

  return <ToolContainer id={id}>{renderComponent()}</ToolContainer>;
};
export default GenericToolbar;
