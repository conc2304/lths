import { Box, Grid, Paper, Typography, styled, Link } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { Property } from 'csstype';
import { Link as RouterLink } from 'react-router-dom';

type OverviewTileProps = {
  title: string;
  metrics: Record<string, number | string>;
  icon: SvgIconComponent;
  tileColor?: Property.BackgroundColor;
  linkToPath?: string;
};

export const OverviewTile = (props: OverviewTileProps) => {
  const { title, metrics, icon: Icon, tileColor, linkToPath } = props;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: tileColor ?? theme.palette.success.light,
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: '100%',
    minHeight: '150px',
  }));

  return (
    <Grid item xs={2} sm={4} md={4}>
      <Item>
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
          {linkToPath ? (
            <Link component={RouterLink} to={linkToPath} color="inherit" underline="hover">
              <Box display="flex" alignItems="end" sx={{ mb: 1.5 }}>
                <Icon fontSize="large" sx={{ mr: 1, mb: 0.25 }} />
                <Typography variant="h3">{title}</Typography>
              </Box>
            </Link>
          ) : (
            <Box display="flex" alignItems="end" sx={{ mb: 1.5 }}>
              <Icon fontSize="large" sx={{ mr: 1, mb: 0.25 }} />
              <Typography variant="h3">{title}</Typography>
            </Box>
          )}
          <Box>
            <Box display="flex">
              {/* this box forces the metric box to take up the least amount of space */}
              <Box flexGrow={1}></Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                {Object.entries(metrics).map(([key, value]) => {
                  return (
                    <Box
                      className="metric-row"
                      key={key}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <Typography variant="body2" sx={{ width: 'auto', mr: 1 }}>
                        {key}
                      </Typography>
                      <Typography variant="body2" sx={{ width: 'auto', fontWeight: 'bold', ml: 1 }}>
                        {value}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Item>
    </Grid>
  );
};
