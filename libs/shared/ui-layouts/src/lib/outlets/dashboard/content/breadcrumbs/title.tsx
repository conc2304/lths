import { Typography } from '@mui/material';

export const BreadcrumbTitle = ({ title }: { title: string }) => {
  return (
    <Typography
      sx={{ fontWeight: 450, fontSize: '0.7rem', lineHeight: 1.5 }}
      color={(theme) => theme.palette.grey[800]}
      aria-label={`Navigate to ${title}`}
      textTransform="uppercase"
    >
      {title}
    </Typography>
  );
};
