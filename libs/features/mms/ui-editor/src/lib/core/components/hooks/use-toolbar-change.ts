import { ChangeEvent } from 'react';
import { validate, v4 as uuid } from 'uuid';

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

  function handlePropChange(propName: string, value: string | object, index?: number, keys?: string[]) {
    const data = updateNestedProp(selectedComponent, propName, value, index, mergeKeys(keys));
    selectComponent(data);
  }

  const generateUniqueId = (objectKey = 'sub_component_data') => {
    if (selectedComponent.data[objectKey]) {
      const object = selectedComponent.data[objectKey];
      let updatedItem;

      if (Array.isArray(object)) {
        const updatedArray = object.map((item) => ({
          ...item,
          _ui_id_: validate(item._ui_id_) ? item._ui_id_ : uuid(),
        }));
        updatedItem = updatedArray;
      } else if (typeof object === 'object') {
        const updatedObject = {
          ...object,
          _ui_id_: validate(object._ui_id_) ? object._ui_id_ : uuid(),
        };
        updatedItem = updatedObject;
      } else {
        throw new Error(`Invalid type for ${objectKey}`);
      }

      selectComponent({
        ...selectedComponent,
        data: { ...selectedComponent.data, [objectKey]: updatedItem },
      });
    } else {
      throw new Error(`Object key ${objectKey} not found in data`);
    }
  };

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
  const handleSubTitleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    keys?: string[]
  ) => {
    handlePropChange('sub_title', event.target.value, index, keys);
  };
  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    keys?: string[]
  ) => {
    handlePropChange('name', event.target.value, index, keys);
  };
  const handleNameValueChange = (value: string, index?: number, keys?: string[]) => {
    handlePropChange('name', value, index, keys);
  };
  const handleIconChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    keys?: string[]
  ) => {
    handlePropChange('icon', event.target.value, index, keys);
  };

  const handleIconValueChange = (value: string, index?: number, keys?: string[]) => {
    handlePropChange('icon', value, index, keys);
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
    handlePropChange('img_alt_text', event.target.value, index, keys);
  };

  const handleImageChange = (value: string, index?: number, keys?: string[]) => {
    handlePropChange('image', value, index, keys);
  };

  const handleColorChange = (color: string, index?: number, keys?: string[]) => {
    handlePropChange('color', color, index, keys);
  };

  const handleTextColorChange = (color: string, index?: number, keys?: string[]) => {
    handlePropChange('text_color', color, index, keys);
  };

  const handleActionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
    index?: number,
    keys: string[] = []
  ) => {
    handlePropChange('action', { [key]: event.target.value }, index, keys);
  };

  const handleMaxSizeChange = (value: string, index?: number, keys?: string[]) => {
    handlePropChange('max_size', value, index, keys);
  };

  const handleSourceTypeChange = (value: string, index?: number, keys?: string[]) => {
    handlePropChange('source_type', value, index, keys);
  };

  return {
    selectedComponent,
    generateUniqueId,
    swapComponentProps,
    updateComponentProp,
    handlePropChange,
    handleTitleChange,
    handleSubTitleChange,
    handleNameChange,
    handleNameValueChange,
    handleDescChange,
    handleDescriptionChange,
    handleButtonTextChange,
    handleLinkChange,
    handleLinkTitleChange,
    handleImageAltChange,
    handleImageChange,
    handleActionChange,
    handleColorChange,
    handleTextColorChange,
    handleAuthorChange,
    handleDateChange,
    handleHintChange,
    handleIconChange,
    handleIconValueChange,
    handleMaxSizeChange,
    handleSourceTypeChange,
  };
};
