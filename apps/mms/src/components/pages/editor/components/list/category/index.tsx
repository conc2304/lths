import { CircularProgress, List, ListItemText, Stack } from '@mui/material';
import SectionItemButton from '@mui/material/ListItemButton';

import { Colors } from '@lths/features/mms/ui-editor';

import { CatergorySectionProps } from '../../types';

const CategorySection = ({
  categories = [],
  onSelectCategory,
  selectedCategory,
  isCategoryListLoading = false,
}: CatergorySectionProps) => {
  const handleListItemClick = (category: string) => {
    onSelectCategory(category);
  };

  if (isCategoryListLoading)
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress color="primary" />
      </Stack>
    );

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
