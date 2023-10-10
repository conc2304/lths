import { BasicTextField, ColorPicker } from '../../../../../elements';
import { BasicContainer } from '../../../../../elements/containers';
import { useToolbarChange } from '../../../hooks';
import { TitleDescComponentProps } from '../../../types';

const TitleDescToolbar = (props: TitleDescComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, desc, linkcolor },
  } = props;
  const { handleTitleChange, handleDescChange, handleColorChange } = useToolbarChange();

  return (
    <BasicContainer id={id}>
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <BasicTextField label={'Description'} value={desc} onChange={handleDescChange} />
      <ColorPicker label={'Link Color'} value={linkcolor} onChange={handleColorChange} />
    </BasicContainer>
  );
};
export default TitleDescToolbar;
