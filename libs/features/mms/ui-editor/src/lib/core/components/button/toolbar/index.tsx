import React, { ChangeEvent } from 'react';
import { Box } from '@mui/material';

import { useEditorActions } from '../../../../context';
import { CardContainer, SegmentedButton, StandardTextField } from '../../../../elements';
import { ButtonComponentProps } from '../../types';

const ButtonToolbar: React.FC<ButtonComponentProps> = (props) => {
  const {
    __ui_id__: id,
    default_data: { style, title },
  } = props;

  const { selectComponent } = useEditorActions();
  const updateComponenetProp = (key: string, value: string | number | null) => {
    const data = { ...props, default_data: { ...props.default_data, [key]: value } };
    selectComponent(data);
    //onChange({ text: event.target.value });
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponenetProp('title', event.target.value);
  };
  const handleStyleChange = (style: string) => {
    updateComponenetProp('style', style);
  };

  const lookups = [
    { key: 'Blank', value: '' },
    { key: 'Fill', value: 'fill' },
  ];
  return (
    <CardContainer id={`${id}_toolbar`} aria-label="Button Toolbar">
      <StandardTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <SegmentedButton label={'Style'} onValueChange={handleStyleChange} data={lookups} value={style} />
    </CardContainer>
  );
};
export default ButtonToolbar;
