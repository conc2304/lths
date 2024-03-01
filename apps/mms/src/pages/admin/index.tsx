import { Box, Grid, styled, Paper, lighten } from '@mui/material';
import { EmojiFlags } from '@mui/icons-material';

import { featureFlagsApi } from '@lths/features/mms/data-access';
import { OverviewTile, getFtFlagOverviewData } from '@lths/shared/ui-admin';
import { PageHeader } from '@lths/shared/ui-layouts';

const AdminRootPage = () => {
  // Retreive Feat. Flag Overview Data
  const flagsCache = featureFlagsApi.endpoints.getFeatureFlags.useQueryState();
  const { data } = flagsCache;
  const enum_values = data ? data.enum_values : [];
  const ftFlagData = getFtFlagOverviewData(enum_values);

  const dataDisplayMap = [
    { title: 'Feature Flags', metrics: ftFlagData, icon: EmojiFlags, linkToPath: '/admin/features' },
  ];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: lighten(theme.palette.action.disabled, 0.5),
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Box
      className="MMS-Admin-Root-Page--root"
      style={{
        width: '-webkit-fill-available',
      }}
    >
      <PageHeader title="Admin Portal" sx={{ mt: '1rem', mb: '3.5rem' }} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {/* render a minium of 6 tiles so that page doesn't look so weird while it is mostly empty */}
          {Array.from(Array(Math.max(6, dataDisplayMap.length))).map((_, index) => {
            const indexHasData = index + 1 >= dataDisplayMap.length && !!dataDisplayMap[index];

            if (!indexHasData)
              return (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Item sx={{ height: '100%', minHeight: '150px' }}> </Item>
                </Grid>
              );

            const { title, metrics, icon, linkToPath } = dataDisplayMap[index];

            return <OverviewTile title={title} metrics={metrics} icon={icon} linkToPath={linkToPath} />;
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminRootPage;
