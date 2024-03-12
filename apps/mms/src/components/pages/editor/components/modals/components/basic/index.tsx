import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import { Colors } from '@lths/features/mms/ui-editor';
import { DialogTitle } from '@lths/shared/ui-elements';
import { filter } from '@lths/shared/utils';

import ComponentGallery from '../../../gallery';
import CategorySection from '../../../list/category';
import Transition from '../../../transitions/slide-up';
import { ComponentModalProps } from '../../../types';

const ComponentModal = ({
  open,
  onClose,
  components,
  categories,
  onSelect,
  onSelectCategory,
  isComponentListLoading,
  isCategoryListLoading,
  showCategories = true,
}: ComponentModalProps) => {
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const searchProps = ['component_id', 'name', 'component_type'];

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (!components) setFiltered([]);
    if (search?.length > 0) {
      setFiltered(filter(components, searchProps, search));
    } else setFiltered(components);
  }, [components, search]);

  useEffect(() => {
    onSelectCategory(selectedCategory !== 'all' ? selectedCategory : '');
  }, [selectedCategory]);

  useEffect(() => {
    if (!open) setSearch('');
  }, [open]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xl'}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{ sx: { width: undefined } }}
    >
      {isComponentListLoading && <LinearProgress color="primary" />}

      <DialogTitle onClose={onClose} title="Components" />
      <DialogContent dividers sx={{ height: '40rem', padding: 0 }}>
        <Grid container flexWrap="nowrap">
          <Grid item xs={2.5}>
            <Box sx={{ position: 'sticky', top: 0 }}>
              <Box sx={{ padding: 1.5 }}>
                <TextField
                  fullWidth
                  label="Search"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: '3rem' },
                  }}
                  value={search}
                  onChange={handleChange}
                ></TextField>
              </Box>
              {showCategories && (
                <Box sx={{ maxHeight: 'calc(80vh - 120px)', overflowY: 'auto' }}>
                  <CategorySection
                    categories={categories}
                    isCategoryListLoading={isCategoryListLoading}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                  />
                </Box>
              )}
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ height: '40rem', padding: 0 }} />
          <Grid item xs={10} sx={{ background: Colors.componentLibrary.background }}>
            <ComponentGallery
              components={filtered}
              onSelect={onSelect}
              isComponentListLoading={isComponentListLoading}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ComponentModal;
