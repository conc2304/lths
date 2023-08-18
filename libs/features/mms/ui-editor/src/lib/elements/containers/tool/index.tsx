import { Box, BoxProps } from '@mui/material';

const ToolContainer = ({ id, children, ...rest }: BoxProps) => {
  return (
    <Box
      id={`${id}-toolbar`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        margin: 2,
        borderRadius: 1,
        background: '#ffffff',
        padding: 3,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default ToolContainer;
