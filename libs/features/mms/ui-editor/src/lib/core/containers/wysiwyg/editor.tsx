import { ComponentProps, useEditorActions } from '../../../context';
import HighlightableComponent from '../../components/high-lighter';
import { componentFactory as factory } from '../../factories';

export default function Editor(props: { components: ComponentProps[]; onAddComponent: (index?: number) => void }) {
  const { components, onAddComponent } = props;
  const { selectComponent, selectedComponent, clearSelectedComponent } = useEditorActions();

  const handleComponentClick = (item: ComponentProps) => {
    if (item === selectedComponent) clearSelectedComponent();
    else {
      selectComponent(item);
    }
  };
  //Do not remove id, {id} is used for implementing auto-scroll when a component is clicked on the navigator
  return (
    <div>
      {components.map((item, index) => {
        const component = factory(item);
        const { __ui_id__ } = item;
        const selected = selectedComponent && __ui_id__ === selectedComponent.__ui_id__;
        return (
          <HighlightableComponent
            id={`editor-component-${__ui_id__}`}
            __ui_id__={__ui_id__}
            onClick={() => handleComponentClick(item)}
            selected={selected}
            key={__ui_id__}
            onAddComponent={onAddComponent}
            index={index}
          >
            {component}
          </HighlightableComponent>
        );
      })}
    </div>
  );
}
