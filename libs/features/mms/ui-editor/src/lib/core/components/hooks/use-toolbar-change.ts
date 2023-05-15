import { ChangeEvent } from 'react';

import { useEditorActions } from '../../../context';

export const useToolbarChange = () => {
  const { selectComponent, selectedComponent } = useEditorActions();

  const updateComponentProp = (key: string, value: string, index?: number) => {
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

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponentProp('title', event.target.value);
  };
  const handleDescChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponentProp('desc', event.target.value);
  };

  const handleLinkTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponentProp('link_title', event.target.value);
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponentProp('image', event.target.value);
  };
  const handleComponentData = (event: ChangeEvent<HTMLInputElement>, index: number, key: string) => {
    updateComponentProp(key, event.target.value, index);
  };

  return {
    selectedComponent,
    handleTitleChange,
    handleDescChange,
    handleLinkTitleChange,
    handleImageChange,
    handleComponentData,
    updateComponentProp,
  };
};
