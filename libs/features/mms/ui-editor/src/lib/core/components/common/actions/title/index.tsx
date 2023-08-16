import { BasicTextField } from '../../../../../elements';
import { useToolbarChange } from '../../../hooks';

const ToolbarTitleAction = () => {
  const {
    handleTitleChange,
    selectedComponent: {
      properties_data: { title },
    },
  } = useToolbarChange();

  return <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />;
};
export default ToolbarTitleAction;
