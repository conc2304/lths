import { Box, Button, Stack, SxProps, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export interface PageHeaderProps {
  title: string;
  createReportHandler: () => void;
  sx?: SxProps;
}

export function PageHeader(props: PageHeaderProps) {
  const { title, createReportHandler, sx = {} } = props;

  return (
    <Box sx={sx}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h1" fontWeight={300}>
          {title}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={createReportHandler}
        >
          CREATE REPORT
        </Button>
      </Stack>
    </Box>
  );
}

export default PageHeader;
