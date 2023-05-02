import { Typography } from '@mui/material';

export const BreadcrumbTitle = ({ title }: { title: string }) => {
  return (
    <Typography variant="h6" color="primary" aria-label={'title'} textTransform="uppercase">
      {title}
    </Typography>
  );
};
