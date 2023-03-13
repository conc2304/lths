import { Typography, IconButton } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';

export const BreadcrumbTrail = ({ paths }: { paths: string[] }) => {
  return (
    <Breadcrumbs>
      <IconButton href="/" size="small">
        <HomeIcon />
      </IconButton>

      {paths.length > 0 && (
        <Typography
          //component={Link}
          //to={document.location.pathname}
          variant="h6"
          sx={{ textDecoration: 'none' }}
          color="textSecondary"
        >
          {paths[0]}
        </Typography>
      )}
      {paths.length > 1 && (
        <Typography variant="subtitle1" color="textPrimary">
          {paths[1]}
        </Typography>
      )}
    </Breadcrumbs>
  );
};
