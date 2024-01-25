import { List, ListItem, Typography, Divider } from '@mui/material';

import { PageDetail } from '@lths/features/mms/data-access';

import ToggleListItem from '../list-items/toggle';

export interface PageItemPreviewedProps {
    title: string;
    page?: PageDetail;
    show: boolean;
    disabled?: boolean;
    onShowToggle?: (show: boolean) => void;
}

export default function PageItemPreviewed({ title, page, show, disabled = false, onShowToggle }: PageItemPreviewedProps) {
    return (
      <List sx={{ padding: 0 }}>
        <ListItem dense={true} sx={{ padding: 2 }}>
          <Typography variant="h5" sx={{ flex: 1 }}>{title}</Typography>
        </ListItem>
        <Divider/>
        { page ?
          <ToggleListItem
            text={page.name}
            page_id={page.page_id}
            isDefault={!page.is_variant}
            disabled={disabled}
            checked={show}
            onToggle={onShowToggle}
          /> 
            :
          <Typography sx={{ padding: 2, paddingTop: 1 }}>Page not found</Typography>
        }
        <Divider/>
      </List>
    );
}