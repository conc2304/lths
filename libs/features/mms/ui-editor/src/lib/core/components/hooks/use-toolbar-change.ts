import { ChangeEvent } from 'react';
import { validate, v4 as uuid } from 'uuid';

import { mergeChildKeys, mergeParentKeys, updateNestedProp } from './utils';
import { useEditorActions } from '../../../context';

export const useToolbarChange = () => {
  const { updateComponent, selectComponent, selectedComponent } = useEditorActions();

  //DEPRECIATED
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
      updateComponent(data);
    } else {
      const updatedComponentData = selectedComponent.data[parent_key].map((component, i) =>
        i === index ? { ...component, [key]: value } : component
      );

      const data = {
        ...selectedComponent,
        data: { ...selectedComponent.data, [parent_key]: updatedComponentData },
      };
      updateComponent(data);
    }
  };

  //helpers
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
    const component1 = updatedComponentData[index];
    updatedComponentData[index] = updatedComponentData[index2];
    updatedComponentData[index2] = component1;
    const data = {
      ...selectedComponent,
      data: { ...selectedComponent.data, sub_component_data: updatedComponentData },
    };

    updateComponent(data);
  };

  //handlers
  function handlePropChange(
    propName: string,
    value: string | boolean | object,
    index?: number,
    parentKeys?: string[],
    childKeys?: string[]
  ) {
    const data = updateNestedProp(
      selectedComponent,
      mergeChildKeys(childKeys, propName),
      value,
      index,
      mergeParentKeys(parentKeys)
    );
    updateComponent(data);
  }

  const handleTitleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    parentKeys?: string[],
    childKeys?: string[]
  ) => {
    handlePropChange('title', event.target.value, index, parentKeys, childKeys);
  };
  const handleSubTitleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    parentKeys?: string[],
    childKeys?: string[]
  ) => {
    handlePropChange('sub_title', event.target.value, index, parentKeys, childKeys);
  };
  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    parentKeys?: string[],
    childKeys?: string[]
  ) => {
    handlePropChange('name', event.target.value, index, parentKeys, childKeys);
  };
  const handleNameValueChange = (value: string, index?: number, parentKeys?: string[], childKeys?: string[]) => {
    handlePropChange('name', value, index, parentKeys, childKeys);
  };
  const handleIconChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    parentKeys?: string[],
    childKeys?: string[]
  ) => {
    handlePropChange('icon', event.target.value, index, parentKeys, childKeys);
  };

  const handleIconValueChange = (value: string, index?: number, parentKeys?: string[], childKeys?: string[]) => {
    handlePropChange('icon', value, index, parentKeys, childKeys);
  };

  const handleAuthorChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    parentKeys?: string[],
    childKeys?: string[]
  ) => {
    handlePropChange('author', event.target.value, index, parentKeys, childKeys);
  };
  const handleDateChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    parentKeys?: string[],
    childKeys?: string[]
  ) => {
    handlePropChange('date_info', event.target.value, index, parentKeys, childKeys);
  };
  const handleHintChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    parentKeys?: string[],
    childKeys?: string[]
  ) => {
    handlePropChange('hint', event.target.value, index, parentKeys, childKeys);
  };
  const handleDescChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    parentKeys?: string[],
    childKeys?: string[]
  ) => {
    handlePropChange('desc', event.target.value, index, parentKeys, childKeys);
  };
  const handleDescriptionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    parentKeys?: string[],
    childKeys?: string[]
  ) => {
    handlePropChange('description', event.target.value, index, parentKeys, childKeys);
  };

  const handleButtonTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    parentKeys?: string[],
    childKeys?: string[]
  ) => {
    handlePropChange('btn_text', event.target.value, index, parentKeys, childKeys);
  };

  const handleLinkChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    parentKeys?: string[],
    childKeys?: string[]
  ) => {
    handlePropChange('link', event.target.value, index, parentKeys, childKeys);
  };

  const handleLinkTitleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    parentKeys?: string[],
    childKeys?: string[]
  ) => {
    handlePropChange('link_title', event.target.value, index, parentKeys, childKeys);
  };

  const handleImageAltChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    parentKeys?: string[],
    childKeys?: string[]
  ) => {
    handlePropChange('img_alt_text', event.target.value, index, parentKeys, childKeys);
  };

  const handleImageChange = (value: string, index?: number, parentKeys?: string[], childKeys?: string[]) => {
    handlePropChange('image', value, index, parentKeys, childKeys);
  };

  const handleColorChange = (color: string, index?: number, parentKeys?: string[], childKeys?: string[]) => {
    handlePropChange('color', color, index, parentKeys, childKeys);
  };

  const handleTextColorChange = (color: string, index?: number, parentKeys?: string[], childKeys?: string[]) => {
    handlePropChange('text_color', color, index, parentKeys, childKeys);
  };

  const handleActionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
    index?: number,
    parentKeys: string[] = [],
    childKeys: string[] = [],
    actionPropName = 'action'
  ) => {
    handlePropChange(actionPropName, { [key]: event.target.value }, index, parentKeys, childKeys);
  };

  const handleMaxSizeChange = (value: string, index?: number, parentKeys?: string[], childKeys?: string[]) => {
    handlePropChange('max_size', value, index, parentKeys, childKeys);
  };

  const handleSourceTypeChange = (value: string, index?: number, parentKeys?: string[], childKeys?: string[]) => {
    handlePropChange('source_type', value, index, parentKeys, childKeys);
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
