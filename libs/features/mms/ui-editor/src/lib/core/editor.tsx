import { componentFactory as factory } from './factories';
import { ComponentProps } from '../context';

export default function Editor(props: { components: ComponentProps[] }) {
  const { components } = props;

  return (
    <div className="editor">
      {components.map((item) => {
        const component = factory(item);
        return (
          <div key={item.id} className="component-wrapper">
            {component}
          </div>
        );
      })}
    </div>
  );
}
