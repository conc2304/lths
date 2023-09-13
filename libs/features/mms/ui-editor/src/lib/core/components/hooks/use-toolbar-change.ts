import { ChangeEvent } from 'react';

import { mergeKeys, updateNestedProp } from './utils';
import { useEditorActions } from '../../../context';

export const useToolbarChange = () => {
  const { selectComponent, selectedComponent } = useEditorActions();

  /**
   * @deprecated This function is deprecated. Use handlePropChange instead.
   */
  const updateComponentProp = (
    key: string,
    value: string | object,
    index?: number,
    parent_key = 'sub_component_data'
  ) => {
    if (index === undefined) {
      const data = { ...selectedComponent, data: { ...selectedComponent.data, [key]: value } };
      selectComponent(data);
    } else {
      const updatedComponentData = selectedComponent.data[parent_key].map((component, i) =>
        i === index ? { ...component, [key]: value } : component
      );

      const data = {
        ...selectedComponent,
        data: { ...selectedComponent.data, [parent_key]: updatedComponentData },
      };
      selectComponent(data);
    }
  };

  function handlePropChange(propName: string, value: string | object, index: number = undefined, keys: string[]) {
    const data = updateNestedProp(selectedComponent, propName, value, index, mergeKeys(keys));
    selectComponent(data);
  }

  //TODO: not generic enough
  const swapComponentProps = (index: number, index2: number) => {
    const updatedComponentData = [...selectedComponent.data.sub_component_data];
    const componet1 = updatedComponentData[index];
    updatedComponentData[index] = updatedComponentData[index2];
    updatedComponentData[index2] = componet1;
    const data = {
      ...selectedComponent,
      data: { ...selectedComponent.data, sub_component_data: updatedComponentData },
    };

    selectComponent(data);
  };

  const handleTitleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    keys?: string[]
  ) => {
    handlePropChange('title', event.target.value, index, keys);
  };
  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    keys?: string[]
  ) => {
    handlePropChange('name', event.target.value, index, keys);
  };
  const handleIconChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    keys?: string[]
  ) => {
    handlePropChange('icon', event.target.value, index, keys);
  };
  const handleAuthorChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    keys?: string[]
  ) => {
    handlePropChange('author', event.target.value, index, keys);
  };
  const handleDateChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    keys?: string[]
  ) => {
    handlePropChange('date_info', event.target.value, index, keys);
  };
  const handleHintChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    keys?: string[]
  ) => {
    handlePropChange('hint', event.target.value, index, keys);
  };
  const handleDescChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    keys?: string[]
  ) => {
    handlePropChange('desc', event.target.value, index, keys);
  };
  const handleDescriptionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    keys?: string[]
  ) => {
    handlePropChange('description', event.target.value, index, keys);
  };

  const handleButtonTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    keys?: string[]
  ) => {
    handlePropChange('btn_text', event.target.value, index, keys);
  };

  const handleLinkChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    keys?: string[]
  ) => {
    handlePropChange('link', event.target.value, index, keys);
  };

  const handleLinkTitleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    keys?: string[]
  ) => {
    handlePropChange('link_title', event.target.value, index, keys);
  };

  const handleImageAltChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    keys?: string[]
  ) => {
    handlePropChange('image_alt_text', event.target.value, index, keys);
  };

  const handleImageChange = (value: string, index?: number, keys?: string[]) => {
    handlePropChange('image', value, index, keys);
  };
  const handleColorChange = (color: string, index?: number, keys?: string[]) => {
    handlePropChange('color', color, index, keys);
  };

  const handleActionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
    index?: number,
    keys: string[] = []
  ) => {
    console.log('handle', event, key, index, keys);
    handlePropChange('action', { [key]: event.target.value }, index, keys);
  };

  return {
    selectedComponent,
    swapComponentProps,
    updateComponentProp,
    handlePropChange,
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
    handleColorChange,
    handleAuthorChange,
    handleDateChange,
    handleHintChange,
    handleIconChange,
  };
};
