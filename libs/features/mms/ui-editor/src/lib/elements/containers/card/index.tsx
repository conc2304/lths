import { Box, BoxProps } from '@mui/material';

const CardContainer = ({ id, children, ...rest }: BoxProps) => {
  return (
    <Box
      id={id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        margin: 2,
        borderRadius: 1,
        background: '#ffffff',
        padding: 2,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default CardContainer;
