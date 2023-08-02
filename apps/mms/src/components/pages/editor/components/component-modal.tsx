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

const ComponentModal = ({ open, onClose, components, onSelect, onSelectCategory }: ComponentModalProps) => {
  const theme = useTheme();

  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState('');

  const [categories, setCategories] = useState<EnumValue[]>([]);

  const searchProps = ['component_id', 'component_name', 'component_type'];

  const [getEnumList] = useLazyGetEnumListQuery();

  const fetchCategories = async () => {
    try {
      const response = await getEnumList('ComponentCategories');
      setCategories(response?.data?.data?.enum_values);
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

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
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
          <Grid item xs={2}>
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
              <CategorySection categories={categories} onSelectCategory={onSelectCategory} />
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ height: '40rem', padding: 0 }} />
          <Grid item xs={10} sx={{ padding: 1 }}>
            <ComponentGallery components={filtered} onSelect={onSelect} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ComponentModal;
