import { BasicTextField, ImagePicker } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { useToolbarChange } from '../../hooks';
import { NewsViewComponentProps } from '../../types';

const NewsViewToolbar = (props: NewsViewComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { image, title, desc, author, date_info, hint },
    onPropChange,
  } = props;

  const {
    handleTitleChange,
    handleDescChange,
    handleImageChange,
    handleAuthorChange,
    handleDateChange,
    handleHintChange,
  } = useToolbarChange();
  return (
    <ToolContainer id={id}>
      <ImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      <BasicTextField label={'Hint'} value={hint} onChange={handleHintChange} />
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <BasicTextField label={'Description'} value={desc} onChange={handleDescChange} />
      <BasicTextField label={'Author'} value={author} onChange={handleAuthorChange} />
      <BasicTextField label={'Date Info'} value={date_info} onChange={handleDateChange} />
    </ToolContainer>
  );
};
export default NewsViewToolbar;
