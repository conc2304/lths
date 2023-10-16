import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuid } from 'uuid';

import { useEditorActions } from '../../../../context';
import { ToolContainer, ToolbarLabel } from '../../../../elements';
import SegmentToolbar from '../../common/segment-group';
import { ActionType, SegmentGroupProps } from '../../types';

const SegmentGroupToolbar = (props: SegmentGroupProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
    onPropChange,
  } = props;
  const { selectComponent } = useEditorActions();

  const handleAdd = () => {
    const data = {
      ...props,
      data: {
        sub_component_data: [
          ...sub_component_data,
          { title: 'Title', description: 'Description', action: { type: ActionType.NATIVE }, segment_id: uuid() },
        ],
      },
    };
    selectComponent(data);
  };

  const handleRemove = (segment_id: string) => {
    const data = {
      ...props,
      data: {
        sub_component_data: sub_component_data.filter((l) => l.segment_id !== segment_id),
      },
    };
    selectComponent(data);
  };

  return (
    <ToolContainer id={id} aria-label="SegmentGroup" sx={{ gap: 0, margin: 2, borderRadius: 0 }}>
      <ToolbarLabel label={'Segment Group'} />
      {sub_component_data.map(({ title, description, action, segment_id }, index) => {
        return (
          <SegmentToolbar
            index={index}
            title={title}
            segment_id={segment_id}
            description={description}
            action={action}
            onPropChange={onPropChange}
            onRemove={handleRemove}
            key={segment_id}
            parent_key={['sub_component_data']}
          />
        );
      })}
      <Button
        data-testid="Add Button"
        variant="outlined"
        sx={{ marginTop: 1, fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase' }}
        onClick={handleAdd}
        startIcon={<AddIcon />}
        fullWidth
      >
        Add Segment
      </Button>
    </ToolContainer>
  );
};

export default SegmentGroupToolbar;
