import heroCarouselToolbarFactory from './factory';
import { ToolbarProps } from '../../../../context';
import { EditableListItemTextWithClose } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { HeroCarouselProps } from '../../types';

type CarouselItemProps = ToolbarProps & {
  item: HeroCarouselProps;
  onClose: () => void;
  index: number;
};

const CarouselItemEditor = (props: CarouselItemProps) => {
  const { item, onClose, index, onPropChange } = props;
  const { name } = item || {};
  const parentKeys = ['sub_component_data'];
  const childKeys = ['data'];
  const { handleNameValueChange } = useToolbarChange();

  const renderComponent = () =>
    heroCarouselToolbarFactory({ ...item, onPropChange, index, keys: parentKeys, childKeys });

  const handleNameChange = (value: string) => {
    handleNameValueChange(value, index, parentKeys);
  };

  return (
    <>
      <EditableListItemTextWithClose text={name || 'Carousel Item'} onSave={handleNameChange} onClose={onClose} />
      {item && renderComponent()}
    </>
  );
};

export default CarouselItemEditor;
