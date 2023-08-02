import { useState } from 'react';
import { List, ListItemText } from '@mui/material';

import SectionItemButton from './ListItemButtonStyled';
import { CatergorySectionProps } from './types';

const CategorySection = ({ categories, onSelectCategory }: CatergorySectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleListItemClick = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category === 'all' ? null : category);
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
