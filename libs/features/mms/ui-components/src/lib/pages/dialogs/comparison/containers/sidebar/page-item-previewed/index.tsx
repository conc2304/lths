import { List, ListItem, Typography, Divider } from '@mui/material';

import { PageItemData } from '../../types';
import ToggleListItem from '../list-items/toggle';

export interface PageItemPreviewedProps {
    title: string;
    pageItem?: PageItemData;
    onShowToggle?: (show: boolean) => void;
}

export default function PageItemPreviewed({ title, pageItem, onShowToggle }: PageItemPreviewedProps) {
    const renderToggleListItem = (pageItem: PageItemData) => {
      const { page, isDisabled, isShow} = pageItem

      return (
        <ToggleListItem
          text={page.name}
          page_id={page.page_id}
          isDefault={!page.is_variant}
          disabled={isDisabled}
          checked={isShow}
          onToggle={onShowToggle}
        />
      );
    }

    return (
      <List sx={{ padding: 0 }}>
        <ListItem dense={true} sx={{ padding: 2 }}>
          <Typography variant="h5" sx={{ flex: 1 }}>{title}</Typography>
        </ListItem>
        <Divider/>
        { pageItem ?
          renderToggleListItem(pageItem)
            :
          <Typography sx={{ padding: 2, paddingTop: 1 }}>Page not found</Typography>
        }
        <Divider/>
      </List>
    );
}