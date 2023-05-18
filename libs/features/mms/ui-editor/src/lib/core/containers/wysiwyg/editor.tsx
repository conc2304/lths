import { ComponentProps, useEditorActions } from '../../../context';
import HighlightableComponent from '../../components/high-lighter';
import { componentFactory as factory } from '../../factories';

export default function Editor(props: { components: ComponentProps[] }) {
  const { components } = props;
  const { selectComponent, selectedComponent, clearSelectedComponent } = useEditorActions();

  const handleComponentClick = (item: ComponentProps) => {
    if (item === selectedComponent) clearSelectedComponent();
    else selectComponent(item);
  };

  return (
    <div>
      {components.map((item) => {
        const component = factory(item);
        const { __ui_id__ } = item;
        const selected = selectedComponent && __ui_id__ === selectedComponent.__ui_id__;
        return (
          <HighlightableComponent onClick={() => handleComponentClick(item)} selected={selected} key={item.__ui_id__}>
            {component}
          </HighlightableComponent>
        );
      })}
    </div>
  );
}
