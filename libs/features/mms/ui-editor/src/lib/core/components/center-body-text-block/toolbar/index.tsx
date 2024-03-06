import { ChangeEvent } from 'react';
import { Divider, MenuItem } from '@mui/material';
import { v4 as uuid } from 'uuid';

import { useEditorActions } from '../../../../context';
import { GroupLabel, OutlinedTextField, AddButton } from '../../../../elements';
import { ToolPreviewContainer, HyperLinkToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { ActionType, CenterBodyTextBlockProps } from '../../types';
import { sizes } from '../utils';

const CenterBodyTextBlockToolbar = (props: CenterBodyTextBlockProps) => {
  const {
    __ui_id__: id,
    data: { title, text_size, linked_text = [], ...rest },
    onPropChange,
  } = props;
  const { handleTitleChange, updateComponentProp } = useToolbarChange();
  const { updateComponent } = useEditorActions();
  const handleStyleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponentProp('text_size', event.target.value);
  };
  const handleAdd = () => {
    const data = {
      ...props,
      data: {
        title,
        text_size,
        ...rest,
        linked_text: [...linked_text, { link_key: '', link_id: uuid(), action: { type: ActionType.NATIVE } }],
      },
    };
    updateComponent(data);
  };

  const handleRemove = (link_id: string) => {
    const data = {
      ...props,
      data: {
        title,
        text_size,
        ...rest,
        linked_text: linked_text.filter((l) => l.link_id !== link_id),
      },
    };
    updateComponent(data);
  };

  return (
    <ToolPreviewContainer onPropChange={onPropChange} id={id}>
      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <OutlinedTextField value={text_size} onChange={handleStyleChange} label="Text Size" select>
        {sizes.map((s) => (
          <MenuItem key={`option-${s.value}`} value={s.value}>
            {s.label}
          </MenuItem>
        ))}
      </OutlinedTextField>
      <Divider />
      {linked_text.map(({ link_key, action, link_id }, index) => {
        const hyperLinkId = `link_${index}`;
        return (
          <HyperLinkToolbar
            index={index}
            link_key={link_key}
            action={action}
            onPropChange={onPropChange}
            updateComponentProp={updateComponentProp}
            onRemove={handleRemove}
            key={hyperLinkId}
            link_id={link_id}
            parent_key={['linked_text']}
          />
        );
      })}
      <AddButton onClick={handleAdd}>
        Add Link
      </AddButton>
    </ToolPreviewContainer>
  );
};

export default CenterBodyTextBlockToolbar;
