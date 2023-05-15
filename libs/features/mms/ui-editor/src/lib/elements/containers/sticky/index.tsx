import Box from '@mui/material/Box';

const StickyContainer = ({ children }) => {
  return <Box sx={{ position: 'sticky', top: 54 }}>{children}</Box>;
};
export default StickyContainer;
