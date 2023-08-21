import React, { useEffect } from 'react';

import { useEditorActions, ComponentProps } from '../../../context';
import toolbarFactory from '../../containers/toolbar/container';

const ToolbarStory = (props: {componentProps: ComponentProps}) => {
  const { componentProps } = props;

  const { selectComponent, components, selectedComponent, addComponent } = useEditorActions();

  useEffect(() => {
    if(components?.length > 0) {
      selectComponent(components[components.length - 1]);
    }
  }, [components.length]);

  useEffect(() => {
    if(components?.length === 0) {
      addComponent(componentProps);
    }
  }, []);

  const component = toolbarFactory({ ...selectedComponent, onPropChange: () => {} } );

  return (
    <div>
      {component}
    </div>
  );
};

export default ToolbarStory;