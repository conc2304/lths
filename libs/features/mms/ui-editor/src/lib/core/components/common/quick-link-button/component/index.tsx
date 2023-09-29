import { Box, Stack, Typography } from '@mui/material';

import colors from '../../../../../common/colors';

const QuickLinkButtonComponent = ({ title = 'link', icon }: { title: string; icon: string }) => {
  const { background, border, boxShadow, text } = colors.quickLinkButton;
  return (
    <Box
      sx={{
        width: '162px',
        height: icon ? '84px' : '52px',
        paddingY: 2,
        background: background,
        border: `1px solid ${border}`,
        borderRadius: '8px',
        boxShadow: boxShadow,
      }}
    >
      <Stack direction="column" alignItems="center" spacing={1}>
        {icon && <img src={icon} alt={'Icon'} style={{ width: 24, height: 24 }} />}
        <Typography
          sx={{
            letterSpacing: '2.24px',
            fontSize: 14,
            color: text,
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {title !== 'link' && title}
        </Typography>
      </Stack>
    </Box>
  );
};
export default QuickLinkButtonComponent;
