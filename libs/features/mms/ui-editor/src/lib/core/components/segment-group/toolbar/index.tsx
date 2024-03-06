import { v4 as uuid } from 'uuid';

import { useEditorActions } from '../../../../context';
import { AddButton, ToolbarLabel } from '../../../../elements';
import { ToolPreviewContainer } from '../../common';
import SegmentToolbar from '../../common/segment-group';
import { ActionType, SegmentGroupProps } from '../../types';

const SegmentGroupToolbar = (props: SegmentGroupProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
    onPropChange,
  } = props;
  const { updateComponent } = useEditorActions();

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
    updateComponent(data);
  };

  const handleRemove = (segment_id: string) => {
    const data = {
      ...props,
      data: {
        sub_component_data: sub_component_data.filter((l) => l.segment_id !== segment_id),
      },
    };
    updateComponent(data);
  };

  return (
    <ToolPreviewContainer onPropChange={onPropChange} id={id} aria-label="SegmentGroup">
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
      <AddButton onClick={handleAdd}>
        Add Segment
      </AddButton>
    </ToolPreviewContainer>
  );
};

export default SegmentGroupToolbar;
