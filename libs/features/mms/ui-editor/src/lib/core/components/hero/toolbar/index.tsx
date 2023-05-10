import { ChangeEvent } from 'react';
import { Divider } from '@mui/material';

import { useEditorActions } from '../../../../context';
import { BasicTextField, CardContainer } from '../../../../elements';
import { QuickLinkListComponent } from '../../common';
import { HeroComponentProps, QuickLinkProps } from '../../types';

const ToolbarComponent = (props: HeroComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { image, title, link_title, component_data = [] },
  } = props;

  const { selectComponent } = useEditorActions();

  const updateComponenetProp = (key: string, value: string) => {
    const data = { ...props, default_data: { ...props.default_data, [key]: value } };
    selectComponent(data);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponenetProp('title', event.target.value);
  };
  const handleLinkTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponenetProp('link_title', event.target.value);
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponenetProp('image', event.target.value);
  };
  const handleActionChange = (event: ChangeEvent<HTMLInputElement>, index: number, key: string) => {
    const data = {
      ...props,
      default_data: {
        ...props.default_data,
        component_data: component_data.map((o: QuickLinkProps, i: number) =>
          i === index ? { ...o, [key]: event.target.value } : o
        ),
      },
    };
    selectComponent(data);
  };

  return (
    <CardContainer id={`${id}_toolbar`}>
      <BasicTextField label={'Image URL'} value={image} onChange={handleImageChange} />
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />

      <Divider />
      <BasicTextField label={'Links Title'} value={link_title} onChange={handleLinkTitleChange} />
      <QuickLinkListComponent data={component_data} onChange={handleActionChange} />
    </CardContainer>
  );
};
export default ToolbarComponent;
