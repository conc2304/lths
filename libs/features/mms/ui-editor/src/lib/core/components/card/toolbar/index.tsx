import React from 'react';

import { useEditorActions } from '../../../../context';
import { CardComponentProps } from '../../types';

const ToolbarComponent: React.FC<CardComponentProps> = (props) => {
  const {
    componentId,
    default_data: { image, title, desc },
    onChange,
  } = props;

  const { updateComponent, selectComponent } = useEditorActions();
  const updateComponenetProp = (key, value) => {
    const data = { ...props, default_data: { ...props.default_data, [key]: value } };
    selectComponent(data);
    //onChange({ text: event.target.value });
  };

  const handleTitleChange = (event) => {
    updateComponenetProp('title', event.target.value);
  };
  const handleDescChange = (event) => {
    updateComponenetProp('desc', event.target.value);
  };
  const handleImageChange = (event) => {
    // onChange({ teimageUrlxt: event.target.value });
  };

  return (
    <div id={`${componentId}_toolbar`}>
      <label>Image URL:</label>
      <input type="text" value={image} onChange={handleImageChange} />
      <br />
      <label>Text</label>
      <textarea value={title} onChange={handleTitleChange}></textarea>
      <br />
      <label>Description</label>
      <textarea value={desc} onChange={handleDescChange}></textarea>
    </div>
  );
};
export default ToolbarComponent;
