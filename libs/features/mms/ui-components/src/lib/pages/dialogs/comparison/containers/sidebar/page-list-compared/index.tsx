import { List, ListItem, Typography, Divider } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { PageItemData } from '../../types';
import DraggableListItem from '../list-items/draggable';

export interface PageListComparedProps {
    title: string;
    pageList?: PageItemData[];
    onDrag: (dragIndex: number, hoverIndex: number) => void;
    onShowToggle?: (show: boolean, index: number) => void;
}

export default function PageListCompared({ title, pageList, onDrag, onShowToggle }: PageListComparedProps) {
    const renderDraggableListItem = (component: PageItemData, index: number) => {
        const { page, isShow, isDisabled } = component;
        const { _id, name, page_id, is_variant } = page;

        return (
          <DraggableListItem
            key={_id}
            id={_id}
            index={index}
            text={name}
            page_id={page_id}
            onDrag={onDrag}
            isDefault={!is_variant}
            checked={isShow}
            disabled={isDisabled}
            onShowToggle={onShowToggle}
          />
        );
    };

    const renderPageList = () => {
        if(!pageList) return <Typography sx={{ padding: 2, paddingTop: 1 }}>Select a Default Page ID</Typography>;
        if(pageList.length === 0) return <Typography sx={{ padding: 2, paddingTop: 1 }}>No results found</Typography>;

        return (pageList.map((item, i) => renderDraggableListItem(item, i)));
    };

    return (
      <DndProvider backend={HTML5Backend}>
        <List sx={{ paddingTop: 0 }}>
          <ListItem dense={true} sx={{ padding: 2 }}>
            <Typography variant="h5" sx={{ flex: 1 }}>{title}</Typography>
          </ListItem>
          <Divider/>
          {renderPageList()}
        </List>
      </DndProvider>
    );
}