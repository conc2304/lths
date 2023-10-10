import { BasicTextField } from '../../../../../elements';
import { BasicContainer } from '../../../../../elements/containers';
import { useToolbarChange } from '../../../hooks';
import { MapPathComponentProps } from '../../../types';

const MapPathToolbar = (props: MapPathComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, desc },
  } = props;
  const { handleTitleChange, handleDescChange } = useToolbarChange();

  return (
    <BasicContainer id={id}>
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <BasicTextField label={'Description'} value={desc} onChange={handleDescChange} />
    </BasicContainer>
  );
};
export default MapPathToolbar;
