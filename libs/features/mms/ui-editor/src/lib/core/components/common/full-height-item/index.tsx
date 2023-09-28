import { Box, Card, CardMedia, Stack, Typography } from '@mui/material';

import colors from '../../../../common/colors';

type FullHeightItemProps = {
  title: string;
  description: string;
  image: string;
};

const FullHeightItem = (props: FullHeightItemProps) => {
  const { title, description, image } = props;

  return (
    <Box sx={{ flex: '0 0 auto' }}>
      <CardMedia
        component="img"
        height="168"
        width="300"
        image={image}
        alt={title}
        sx={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
      />
      <Box sx={{ background: '#242526', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} padding={2}>
        <Typography variant="h5" sx={{ color: colors.editor.text, fontWeight: 450 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.editor.subText, fontSize: '0.875rem' }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default FullHeightItem;
