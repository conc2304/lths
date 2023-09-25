import { Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/system';
import { v4 as uuid } from 'uuid';

import { useEditorActions } from '../../../../context';
import { GroupLabel, OutlinedTextField, ToolContainer } from '../../../../elements';
import { HyperLinkToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { ActionType, CenterHeadlineTextProps } from '../../types';

const CenterHeadlineTextToolbar = (props: CenterHeadlineTextProps) => {
  const {
    __ui_id__: id,
    data: { title, linked_text = [] },
    onPropChange,
  } = props;
  const { updateComponentProp, handleTitleChange } = useToolbarChange();
  const { selectComponent } = useEditorActions();

  const handleAdd = () => {
    const data = {
      ...props,
      data: {
        title,
        linked_text: [...linked_text, { link_key: '', link_id: uuid(), action: { type: ActionType.NATIVE } }],
      },
    };
    selectComponent(data);
  };

  const handleRemove = (link_id: string) => {
    const data = {
      ...props,
      data: {
        title,
        linked_text: linked_text.filter((l) => l.link_id !== link_id),
      },
    };
    selectComponent(data);
  };

  return (
    <ToolContainer id={id}>
      <Stack spacing={2}>
        <GroupLabel label={'Headline'} />
        <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
        <Divider sx={{ marginY: 3 }} />
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
      </Stack>
    </ToolContainer>
  );
};

export default CenterHeadlineTextToolbar;
