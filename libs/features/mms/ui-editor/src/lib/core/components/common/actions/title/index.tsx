import { BasicTextField } from '../../../../../elements';
import { useToolbarChange } from '../../../hooks';

const ToolbarTitleAction = () => {
  const {
    handleTitleChange,
    selectedComponent: {
      default_data: { title },
    },
  } = useToolbarChange();

  return <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />;
};
export default ToolbarTitleAction;
