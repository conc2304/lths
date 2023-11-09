import React, { useEffect } from 'react';

import { useEditorActions, ComponentProps } from '../../context';
import toolbarFactory from '../containers/toolbar/container';

const ToolbarMock = (props: { componentProps: ComponentProps }) => {
  const { componentProps } = props;

  const { updateComponent, components, selectedComponent, addComponent } = useEditorActions();

  useEffect(() => {
    if (components?.length > 0) {
      updateComponent(components[components.length - 1]);
    }
  }, [components.length]);

  const handleClick = async () => {
    addComponent(componentProps);
  };

  const component = toolbarFactory({
    ...selectedComponent,
    onPropChange: () => {
      /** do nothing */
    },
  });

  return (
    <div>
      {component}
      <button className="add-component-button" onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
};

export default ToolbarMock;
