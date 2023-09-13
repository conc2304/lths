import { Box, Stack, Typography } from '@mui/material';

const QuickLinkButtonComponent = ({ title = 'link', icon }: { title: string; icon: string }) => {
  return (
    <Box
      sx={{
        width: '162px',
        height: '84px',
        padding: 2,
        background: '#303031',
        color: '#D8BA90',
        border: '1px solid',
        borderRadius: '8px',
        boxShadow: '0px 8px 12px -2px #0000004D, 0px 2px 6px -2px #0000004D',
      }}
    >
      <Stack direction="column" alignItems="center" spacing={1}>
        <div>
          <img src={icon} alt={''} style={{ width: 24, height: 24 }} />
        </div>
        <Typography sx={{ letterSpacing: '0.16px', fontSize: 14, color: '#D8BA90', textTransform: 'uppercase' }}>
          {title !== 'link' && title}
        </Typography>
      </Stack>
    </Box>
  );
};
export default QuickLinkButtonComponent;
