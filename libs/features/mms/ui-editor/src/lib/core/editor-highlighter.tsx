import HighlightableComponent from './components/highlatable';
import { componentFactory as factory } from './factories';
import { ComponentProps, useEditorActions } from '../context';

export default function Editor(props: { components: ComponentProps[] }) {
  const { components } = props;
  const { selectComponent, selectedComponent, clearSelectedComponent } = useEditorActions();
  const handleComponentClick = (item: ComponentProps) => {
    console.log('handleComponentClick', item);
    if (item === selectedComponent) clearSelectedComponent();
    else selectComponent(item);
  };
  return (
    <div className="editor">
      {components.map((item) => {
        const component = factory(item);
        const { __ui_id__ } = item;
        const selected = selectedComponent && __ui_id__ === selectedComponent.__ui_id__;
        return (
          <HighlightableComponent onClick={() => handleComponentClick(item)} selected={selected}>
            <div key={item.id} className="component-wrapper">
              {component}
            </div>
          </HighlightableComponent>
        );
      })}
    </div>
  );
}
