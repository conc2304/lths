import { ChangeEvent } from 'react';
import { MenuItem, TextField, Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useEditorActions } from '../../../../context';
import { GroupLabel, OutlinedTextField, ToolContainer } from '../../../../elements';
import { HyperLinkToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { TitleTextComponentProps } from '../../types';
import { sizes } from '../utils';

const TitleTextToolbar = (props: TitleTextComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, text_size, linked_text = [], ...rest },
    onPropChange,
  } = props;

  const { updateComponentProp, handleTitleChange } = useToolbarChange();
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
        linked_text: [...linked_text, { link_value: 'New link' }],
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
    <ToolContainer id={id}>
      <GroupLabel label={'Title Text Block'} />
      <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <TextField value={text_size} onChange={handleStyleChange} label="Text Size" select fullWidth>
        {sizes.map((s) => (
          <MenuItem key={`option-${s.value}`} value={s.value}>
            {s.label}
          </MenuItem>
        ))}
      </TextField>
      <Divider sx={{ marginY: 1 }} />

      {linked_text.map(({ link_key, action, link_id }, index) => {
        const hyperLinkId = `Link_${index}`;
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
      <Button
        data-testid="Add Button"
        variant="outlined"
        sx={{ fontSize: '14px', fontWeight: 500, textTransform: 'uppercase' }}
        onClick={handleAdd}
        startIcon={<AddIcon />}
        fullWidth
      >
        Add Link
      </Button>
    </ToolContainer>
  );
};
export default TitleTextToolbar;
