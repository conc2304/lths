import { Typography } from '@mui/material';

export const BreadcrumbTitle = ({ title }: { title: string }) => {
  return (
    <Typography
      sx={{ fontSize: '0.75rem' }}
      color="inherit"
      aria-label={`Navigate to ${title}`}
      textTransform="uppercase"
    >
      {title}
    </Typography>
  );
};
