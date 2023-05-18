import { UnsupportedToolbar } from '../..';
import { ComponentProps } from '../../../../context';
import { BasicTextField, CardContainer, ImagePicker } from '../../../../elements';
import { ColorPicker } from '../../../../elements';
import { useToolbarChange } from '../../hooks';

enum FormControl {
  Image = 'image',
  Title = 'title',
  Description = 'desc',
  Color = 'color',
}

const GenericToolbar = (props: ComponentProps) => {
  console.log('props', props.component_id, Object.getOwnPropertyNames(props.default_data));

  const { __ui_id__: id, default_data } = props;

  const { handleImageChange2, handleTitleChange, handleDescChange, handleColorChange } = useToolbarChange();

  const formFactory = (key: string) => {
    switch (key) {
      case FormControl.Image:
        return <ImagePicker initialValue={default_data.image} onChange={handleImageChange2} />;
      case FormControl.Title:
        return <BasicTextField label={'Title'} value={default_data.title} onChange={handleTitleChange} />;
      case FormControl.Description:
        return <BasicTextField label={'Title'} value={default_data.desc} onChange={handleDescChange} />;
      case FormControl.Color:
        return <ColorPicker initialColor={default_data.color} onChange={handleColorChange} />;

      default:
        return null;
    }
  };

  const renderComponent = () => {
    const keys = Object.getOwnPropertyNames(props.default_data);
    const controls = keys.map((key) => {
      return formFactory(key);
    });

    if (!controls || controls.filter((o) => o !== null).length === 0) return <UnsupportedToolbar {...props} />;
    else return controls;
  };

  return <CardContainer id={`${id}_toolbar`}>{renderComponent()}</CardContainer>;
};
export default GenericToolbar;
