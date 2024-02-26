import React from 'react'
import { Divider } from '@mui/material';

import { DraggableCard } from '@lths/features/mms/ui-editor';

import ToggleListItem from '../toggle';

export interface DraggableListItemProps {
  id: string;
  index: number;
  text: string;
  page_id: string;
  isDefault?: boolean;
  disabled?: boolean;
  checked: boolean;
  onDrag: (dragIndex: number, hoverIndex: number) => void;
  onShowToggle?: (show: boolean, index: number) => void;
}

const DraggableListItem = ({ id, index, text, page_id, isDefault = false, disabled = false, checked, onDrag, onShowToggle }: DraggableListItemProps) => {
  const ItemTypes = {
    PREVIEW: 'preview item',
  };

  const handleToggle = (show: boolean, index?: number) => { 
    onShowToggle && index !== undefined && onShowToggle(show, index);
  };

  return (
    <DraggableCard id={id} index={index} 
      onDrag={onDrag} 
      typeName={ItemTypes.PREVIEW}
    >
      <ToggleListItem
        index={index}
        text={text}
        page_id={page_id}
        checked={checked}
        disabled={disabled}
        isDefault={isDefault}
        onToggle={handleToggle}
      />
      <Divider/>
    </DraggableCard>
  );
};

export default DraggableListItem;   