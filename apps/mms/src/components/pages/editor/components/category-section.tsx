import { List, ListItemText } from '@mui/material';

import SectionItemButton from './list-item-button-styled';
import { CatergorySectionProps } from './types';

const CategorySection = ({ categories, onSelectCategory, selectedCategory }: CatergorySectionProps) => {
  const handleListItemClick = (category: string) => {
    onSelectCategory(category);
  };

  return (
    <List component="nav" aria-label="component category list" disablePadding>
      <SectionItemButton selected={selectedCategory === 'all'} onClick={() => handleListItemClick('all')}>
        <ListItemText primary="ALL" />
      </SectionItemButton>
      {categories.map((c) => (
        <SectionItemButton
          selected={selectedCategory === c.value}
          onClick={() => handleListItemClick(c.value)}
          key={c.value}
        >
          <ListItemText primary={c.name.toUpperCase()} />
        </SectionItemButton>
      ))}
    </List>
  );
};

export default CategorySection;
