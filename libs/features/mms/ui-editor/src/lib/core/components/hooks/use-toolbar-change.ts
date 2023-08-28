import { ChangeEvent } from 'react';

import { useEditorActions } from '../../../context';

export const useToolbarChange = () => {
  const { selectComponent, selectedComponent } = useEditorActions();

  const updateComponentProp = (
    key: string,
    value: string | object,
    index?: number,
    parent_key = 'sub_properties_data'
  ) => {
    if (index === undefined) {
      const data = { ...selectedComponent, properties_data: { ...selectedComponent.properties_data, [key]: value } };
      selectComponent(data);
    } else {
      const updatedComponentData = selectedComponent.properties_data[parent_key].map((component, i) =>
        i === index ? { ...component, [key]: value } : component
      );

      const data = {
        ...selectedComponent,
        properties_data: { ...selectedComponent.properties_data, [parent_key]: updatedComponentData },
      };
      selectComponent(data);
    }
  };

  const swapComponentProps = (index: number, index2: number) => {
    const updatedComponentData = [...selectedComponent.properties_data.sub_properties_data];
    const componet1 = updatedComponentData[index];
    updatedComponentData[index] = updatedComponentData[index2];
    updatedComponentData[index2] = componet1;
    const data = {
      ...selectedComponent,
      properties_data: { ...selectedComponent.properties_data, sub_properties_data: updatedComponentData },
    };

    selectComponent(data);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('title', event.target.value, index);
  };
  const handleNameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('name', event.target.value, index);
  };
  const handleIconChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('icon', event.target.value, index);
  };
  const handleAuthorChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('author', event.target.value, index);
  };
  const handleDateChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('date_info', event.target.value, index);
  };
  const handleHintChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('hint', event.target.value, index);
  };
  const handleDescChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('desc', event.target.value, index);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('description', event.target.value, index);
  };

  const handleButtonTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('btn_text', event.target.value, index);
  };

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('link', event.target.value, index);
  };
  const handleLinkTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('link_title', event.target.value, index);
  };
  const handleImageAltChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('img_alt_text', event.target.value, index);
  };

  const handleImageChange = (value: string, index?: number) => {
    updateComponentProp('image', value, index);
  };
  const handleColorChange = (color: string, index?: number) => {
    updateComponentProp('color', color, index);
  };
  //TODO: clean this up
  const handleActionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
    index?: number
  ) => {
    if (index === undefined) {
      updateComponentProp('action', { ...selectedComponent.properties_data.action, [key]: event.target.value }, index);
    } else {
      updateComponentProp(
        'action',
        { ...selectedComponent.properties_data.sub_properties_data[index].action, [key]: event.target.value },
        index
      );
    }
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
    swapComponentProps,
    updateComponentProp,
    handleTitleChange,
    handleNameChange,
    handleDescChange,
    handleDescriptionChange,
    handleButtonTextChange,
    handleLinkChange,
    handleLinkTitleChange,
    handleImageAltChange,
    handleImageChange,
    handleActionChange,
    handleComponentDataChange,
    handleColorChange,
    handleAuthorChange,
    handleDateChange,
    handleHintChange,
    handleIconChange,
  };
};
