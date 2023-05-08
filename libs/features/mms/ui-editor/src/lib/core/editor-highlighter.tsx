import HighlightableComponent from './components/highlatable';
import { componentFactory as factory } from './factories';
import { ComponentProps, useEditorActions } from '../context';

export default function Editor(props: { components: ComponentProps[] }) {
  const { components } = props;
  const { selectComponent } = useEditorActions();
  const handleComponentClick = (item: ComponentProps) => {
    console.log('handleComponentClick', item);
    selectComponent(item);
  };
  return (
    <div className="editor">
      {components.map((item) => {
        const component = factory(item);
        return (
          <HighlightableComponent onClick={() => handleComponentClick(item)}>
            <div key={item.id} className="component-wrapper">
              {component}
            </div>
          </HighlightableComponent>
        );
      })}
    </div>
  );
}
