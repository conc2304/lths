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
  const { handleImageChange, handleTitleChange, handleDescChange, handleColorChange } = useToolbarChange();
  if (!props) return null;

  const { __ui_id__: id, data, onPropChange } = props;
  const formFactory = (key: string) => {
    switch (key) {
      case FormControl.Image:
        return <ImagePicker value={data.image} onChange={handleImageChange} onReplace={onPropChange} />;
      case FormControl.Title:
        return <BasicTextField label={'Title'} value={data.title} onChange={handleTitleChange} />;
      case FormControl.Description:
        return <BasicTextField label={'Description'} value={data.desc} onChange={handleDescChange} />;
      case FormControl.Color:
        return <ColorPicker label="Color" value={data.color} onChange={handleColorChange} />;

      default:
        return null;
    }
  };

  const renderComponent = () => {
    const keys = Object.getOwnPropertyNames(props.data);
    const controls = keys.map((key) => {
      return formFactory(key);
    });

    if (!controls || controls.filter((o) => o !== null).length === 0) return <UnsupportedToolbar {...props} />;
    else return controls;
  };

  return <ToolContainer id={id}>{renderComponent()}</ToolContainer>;
};
export default GenericToolbar;
