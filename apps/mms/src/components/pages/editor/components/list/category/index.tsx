import { List, ListItemText } from '@mui/material';

import { Colors } from '@lths/features/mms/ui-editor';

import SectionItemButton from '../../list-item';
import { CatergorySectionProps } from '../../types';

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
          <ListItemText primary={c.name.toUpperCase()} color={Colors.componentLibrary.category} />
        </SectionItemButton>
      ))}
    </List>
  );
};

export default CategorySection;
