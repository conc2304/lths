import React from 'react'
import { Link, ListItem, Stack, Typography, ListItemSecondaryAction, Switch, Tooltip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link as RouterLink } from 'react-router-dom';

export interface ToggleListItemProps {
  index?: number;
  text: string;
  page_id: string;
  isDefault?: boolean;
  disabled?: boolean;
  checked: boolean;
  onToggle?: (value: boolean, index?: number) => void;
}

const ToggleListItem = ({ index, text, page_id, isDefault = false, disabled = false, checked, onToggle }: ToggleListItemProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onToggle && onToggle(checked, index);
  };

  return (
    <ListItem dense={true} sx={{ opacity: disabled ? 0.38 : 1, padding: 2, paddingLeft: isDefault ? 1 : 2, paddingRight: 8, gap: 1 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        { isDefault &&
          <Tooltip title={"default page"} arrow placement="bottom-start">
            <StarIcon/>
          </Tooltip>
        }
        <Stack>
          <Typography>{text}</Typography>
          <Link
            component={RouterLink} to={`/pages/editor/${page_id}`} target="_blank" 
            color="text.secondary" underline="hover" sx={{fontSize: 12}}
          >
            {page_id}
          </Link>
        </Stack>
      </Stack>
      <ListItemSecondaryAction sx={{ right: 8 }}>
        <Switch
          aria-label={`show/hide toggle${index}`}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ToggleListItem;   