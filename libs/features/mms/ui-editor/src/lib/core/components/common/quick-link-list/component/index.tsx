import { Box, Stack, Typography } from '@mui/material';

import { QuickLinkProps } from '../../../types';
import QuickLinkComponent from '../../quick-link/component';

type Props = {
  data: QuickLinkProps[];
  title: string;
};

const QuickLinkListComponent = ({ data, title = 'Quick Links' }: Props) => {
  return (
    <Box>
      <Box sx={{ marginTop: 'auto' }}>
        <Typography sx={{ paddingBottom: 1, fontSize: 14, fontWeight: 600, color: '#ffffff', wordWrap: 'break-word' }}>
          {title}
        </Typography>
      </Box>
      <Stack flexDirection={'row'} gap={1}>
        {data?.map((props, i) => {
          return <QuickLinkComponent key={`quick_link_${i}`} {...props} />;
        })}
      </Stack>
    </Box>
  );
};
export default QuickLinkListComponent;
