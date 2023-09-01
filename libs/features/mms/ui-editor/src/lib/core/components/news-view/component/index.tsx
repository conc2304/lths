import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

import { Colors } from '../../../../common';
import { NewsViewComponentProps } from '../../types';

const NewsViewComponent = (props: NewsViewComponentProps) => {
  const {
    default_data: { image, title, desc, hint, author, date_info },
    __ui_id__: id,
  } = props;
  return (
    <Card id={`${id}_component`}>
      <CardActionArea>
        <CardMedia component="img" height="180" image={image} alt={title} />
        <CardContent>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: Colors.quicklink.background,
              fontSize: '0.8rem',
              marginTop: '0.8rem',
            }}
          >
            {hint}
          </Typography>

          <Typography
            gutterBottom
            variant="h3"
            component="div"
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '900' }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: '0.9rem',
            }}
          >
            {desc}
          </Typography>
          <Box display="flex" flexDirection="row" sx={{ marginBottom: '0.7rem' }}>
            <Typography
              variant="body2"
              color="text.primary"
              style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.8rem' }}
            >
              {author}
            </Typography>
            <Box mx={1} borderLeft={1} borderColor="text.secondary" height={17} />
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.8rem' }}
            >
              {date_info}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NewsViewComponent;
