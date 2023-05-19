import { ChangeEvent } from 'react';

import { useEditorActions } from '../../../context';

export const useToolbarChange = () => {
  const { selectComponent, selectedComponent } = useEditorActions();

  const updateComponentProp = (key: string, value: string | object, index?: number) => {
    if (index === undefined) {
      const data = { ...selectedComponent, default_data: { ...selectedComponent.default_data, [key]: value } };
      selectComponent(data);
    } else {
      const updatedComponentData = selectedComponent.default_data.component_data.map((component, i) =>
        i === index ? { ...component, [key]: value } : component
      );

      const data = {
        ...selectedComponent,
        default_data: { ...selectedComponent.default_data, component_data: updatedComponentData },
      };
      selectComponent(data);
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('title', event.target.value, index);
  };
  const handleDescChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('desc', event.target.value, index);
  };
  const handleLinkTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('link_title', event.target.value, index);
  };

  const handleImageChange = (value: string, index?: number) => {
    updateComponentProp('image', value, index);
  };
  const handleColorChange = (color: string, index?: number) => {
    updateComponentProp('color', color, index);
  };

  const handleComponentDataChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
    index: number
  ) => {
    updateComponentProp(key, event.target.value, index);
  };

  return {
    selectedComponent,
    updateComponentProp,
    handleTitleChange,
    handleDescChange,
    handleLinkTitleChange,
    handleImageChange,
    handleComponentDataChange,
    handleColorChange,
  };
};
