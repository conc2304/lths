import { ChangeEvent } from 'react';

import { ToolContainer, BasicTextField, ColorTextField } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { EventInfoComponentProps } from '../../types';

const EventInfoToolbar = (props: EventInfoComponentProps) => {
  const {
    __ui_id__: id,
    default_data: {
      title,
      desc,
      date_lbl_txt,
      date_lbl_txt_color,
      date_data_txt,
      date_data_txt_color,
      location_lbl_txt,
      location_lbl_txt_color,
      location_data_txt,
      location_data_txt_color,
    },
  } = props;

  const { handleTitleChange, handleDescChange, updateComponentProp } = useToolbarChange();

  const handleColorChange = (key: string, color: string) => {
    updateComponentProp(key, color);
  };

  const handleDateLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponentProp('date_lbl_txt', event.target.value);
  };

  const handleDateDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponentProp('date_data_txt', event.target.value);
  };

  const handleLocationLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponentProp('location_lbl_txt', event.target.value);
  };

  const handleLocationDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponentProp('location_data_txt', event.target.value);
  };

  return (
    <ToolContainer id={id} aria-label="Button Toolbar">
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <BasicTextField label={'Description'} value={desc} onChange={handleDescChange} multiline rows={3} />
      <ColorTextField
        label={'Date Label'}
        value={date_lbl_txt}
        onChange={handleDateLabelChange}
        colorValue={date_lbl_txt_color}
        onColorChange={(c) => handleColorChange('date_lbl_txt_color', c)}
      />
      <ColorTextField
        label={'Date Data'}
        value={date_data_txt}
        onChange={handleDateDataChange}
        colorValue={date_data_txt_color}
        onColorChange={(c) => handleColorChange('date_data_txt_color', c)}
      />
      <ColorTextField
        label={'Location Label'}
        value={location_lbl_txt}
        onChange={handleLocationLabelChange}
        colorValue={location_lbl_txt_color}
        onColorChange={(c) => handleColorChange('location_lbl_txt_color', c)}
      />
      <ColorTextField
        label={'Location Data'}
        value={location_data_txt}
        onChange={handleLocationDataChange}
        colorValue={location_data_txt_color}
        onColorChange={(c) => handleColorChange('location_data_txt_color', c)}
      />
    </ToolContainer>
  );
};
export default EventInfoToolbar;
