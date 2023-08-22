import { ChangeEvent, forwardRef, ReactElement, Ref, useEffect, useState } from 'react';
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
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import { EnumValue, useLazyGetEnumListQuery } from '@lths/features/mms/data-access';
import { filter } from '@lths/shared/utils';

import CategorySection from './category-section';
import ComponentGallery from './gallery';
import { ComponentModalProps } from './types';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ComponentModal = ({
  open,
  onClose,
  components,
  onSelect,
  onSelectCategory,
  isComponentListLoading,
}: ComponentModalProps) => {
  const theme = useTheme();

  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('all');

  const [categories, setCategories] = useState<EnumValue[]>([]);

  const searchProps = ['component_id', 'component_name', 'component_type'];

  const [getEnumList] = useLazyGetEnumListQuery();

  const fetchCategories = async () => {
    try {
      const response = await getEnumList('ComponentCategories').unwrap();
      if (response?.success) setCategories(response?.data?.enum_values);
    } catch (error) {
      console.error('Error in fetching the component categories');
    }
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

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
          <Grid item xs={10}>
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
