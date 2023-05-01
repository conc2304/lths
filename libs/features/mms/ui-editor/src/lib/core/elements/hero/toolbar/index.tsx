import React from 'react';

import { HeroToolbarProps } from '../../../../types';

const ToolbarComponent: React.FC<HeroToolbarProps> = ({ componentId, imageUrl, title, onChange }) => {
  const handleTextChange = (event) => {
    onChange({ text: event.target.value });
  };

  const handleImageChange = (event) => {
    onChange({ teimageUrlxt: event.target.value });
  };

  return (
    <div id={`${componentId}_toolbar`}>
      <label>Image URL:</label>
      <input type="text" value={imageUrl || ''} onChange={handleImageChange} />
      <br />
      <label>Text:</label>
      <textarea value={title || ''} onChange={handleTextChange}></textarea>
    </div>
  );
};
export default ToolbarComponent;
