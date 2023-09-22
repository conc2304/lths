import { ChangeEvent } from 'react';
import { Typography, MenuItem, TextField, Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useEditorActions } from '../../../../context';
import { ToolContainer } from '../../../../elements';
import HyperLinkToolbar from '../../common/hyper-link';
import { useToolbarChange } from '../../hooks';
import { ActionType, HeadlineTextBlockComponentProps } from '../../types';
import { size } from '../utils';

const HeadLineTextBlockToolbar = (props: HeadlineTextBlockComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, text_size, linked_text },
    onPropChange,
  } = props;

  console.log('headline props', props);

  const { selectComponent } = useEditorActions();
  const { updateComponentProp } = useToolbarChange();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponentProp('title', event.target.value);
  };
  const handleStyleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponentProp('text_size', event.target.value);
  };

  const handleAdd = () => {
    const data = {
      ...props,
      data: {
        title,
        text_size,
        linked_text: [
          ...linked_text,
          { link_key: '', link_id: Math.floor(Math.random() * 9999), action: { type: ActionType.NATIVE } },
        ],
      },
    };
    selectComponent(data);
  };

  const handleRemove = (link_id: string) => {
    const data = {
      ...props,
      data: {
        title,
        text_size,
        linked_text: linked_text.filter((l) => l.link_id !== link_id),
      },
    };
    selectComponent(data);
  };

  return (
    <ToolContainer id={id} aria-label="Headline Text" sx={{ gap: 0, margin: 2, borderRadius: 0 }}>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        Title
      </Typography>
      <TextField label={'Title'} value={title} onChange={(e) => handleTitleChange(e)} sx={{ mb: 4 }} fullWidth />

      <TextField value={text_size} onChange={handleStyleChange} label="Text Size" select fullWidth>
        {size.map((s) => (
          <MenuItem key={`option-${s.value}`} value={s.value}>
            {s.label}
          </MenuItem>
        ))}
      </TextField>
      <Divider sx={{ margin: '24px 0' }} />
      {linked_text.map(({ link_key, action, link_id }, index) => {
        const hyperLinkId = `link${index}`;
        return (
          <HyperLinkToolbar
            index={index}
            link_key={link_key}
            link_number={index + 1}
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
        sx={{ marginTop: 1, fontSize: '14px', fontWeight: 500, textTransform: 'uppercase' }}
        onClick={handleAdd}
        startIcon={<AddIcon />}
        fullWidth
      >
        Add Link
      </Button>
    </ToolContainer>
  );
};
export default HeadLineTextBlockToolbar;
