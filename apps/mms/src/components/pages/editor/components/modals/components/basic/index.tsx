import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
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

import { EnumValue, useLazyGetEnumListQuery } from '@lths/features/mms/data-access';
import { Colors } from '@lths/features/mms/ui-editor';
import { filter } from '@lths/shared/utils';

import ComponentGallery from '../../../gallery';
import CategorySection from '../../../list/category';
import Transition from '../../../transitions/slide-up';
import { ComponentModalProps } from '../../../types';

const ComponentModal = ({
  open,
  onClose,
  components,
  onSelect,
  onSelectCategory,
  isComponentListLoading,
}: ComponentModalProps) => {
  const [getEnumList] = useLazyGetEnumListQuery();

  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<EnumValue[]>([]);

  const theme = useTheme();

  const searchProps = ['component_id', 'component_name', 'component_type'];

  const fetchCategories = async () => {
    try {
      const response = await getEnumList('ComponentCategories').unwrap();
      if (response?.success) setCategories(response?.data?.enum_values);
    } catch (error) {
      console.error('Error in fetching the component categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!components) setFiltered([]);
    if (search?.length > 0) {
      setFiltered(filter(components, searchProps, search));
    } else setFiltered(components);
  }, [components, search]);

  useEffect(() => {
    onSelectCategory(selectedCategory !== 'all' ? selectedCategory : '');
  }, [selectedCategory]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Dialog fullWidth={true} maxWidth={'xl'} open={open} onClose={onClose} TransitionComponent={Transition}>
      {isComponentListLoading && <LinearProgress color="primary" />}
      <DialogTitle>
        <Typography sx={{ fontSize: '1.5rem' }}>Components</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: () => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
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
              <CategorySection
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
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
