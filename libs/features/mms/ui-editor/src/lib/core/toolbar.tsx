import React from 'react';

import { toolbarFactory as factory } from './factories';
import { useEditor } from '../context';
export default function Toolbar({ component }) {
  const {
    actions: { updateComponent },
  } = useEditor();
  const onChange = (item) => {
    updateComponent({ ...component, ...item });
  };

  if (!component) {
    return null;
  }

  const toolbar = factory({ ...component, onChange });
  return (
    <div className="prop-editor">
      <h2>Component Properties</h2>
      {toolbar}
    </div>
  );
}
