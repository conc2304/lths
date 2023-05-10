import { ChangeEvent } from 'react';

import { useEditorActions } from '../../../../context';
import { BasicTextField } from '../../../../elements';
import { CardContainer } from '../../../../elements/containers';
import { CardComponentProps } from '../../types';

const ToolbarComponent = (props: CardComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { image, title, desc },
  } = props;

  const { selectComponent } = useEditorActions();

  const updateComponenetProp = (key: string, value: string) => {
    const data = { ...props, default_data: { ...props.default_data, [key]: value } };
    selectComponent(data);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponenetProp('title', event.target.value);
  };
  const handleDescChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponenetProp('desc', event.target.value);
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponenetProp('image', event.target.value);
  };

  return (
    <CardContainer id={`${id}_toolbar`}>
      <BasicTextField label={'Image URL'} value={image} onChange={handleImageChange} />
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <BasicTextField label={'Description'} value={desc} onChange={handleDescChange} />
    </CardContainer>
  );
};
export default ToolbarComponent;
