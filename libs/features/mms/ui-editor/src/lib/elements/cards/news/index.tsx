import { CardActionArea, CardActions, IconButton, Stack } from '@mui/material';
import OpenIcon from '@mui/icons-material/OpenInNew';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export type NewsCardProps = {
  image: string;
  title: string;
  desc: string;
  tag: string;
  date: string;
  action: { page_link: string };
};

const colors = { brand: { primary: '#111921', secondary: '#BA9765' }, text: '#ffffff' };

export default function NewsCard({ image, title, desc, tag, date, action }: NewsCardProps) {
  const handleClick = () => {
    window.open(action.page_link, '_blank');
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt={title} />
        <CardContent sx={{ background: colors.brand.primary }}>
          <Typography
            gutterBottom
            fontSize={11}
            component="div"
            color={colors.brand.secondary}
            fontWeight={500}
            textTransform={'uppercase'}
          >
            {tag}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" color={colors.text}>
            {title}
          </Typography>
          <Typography variant="body2" color={colors.text}>
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ background: colors.brand.primary }}>
        <Stack direction={'row'} justifyContent={'space-between'} flex={1}>
          <Typography fontSize={11} color={colors.text}>
            {date}
          </Typography>
          <IconButton aria-label="Open" sx={{ padding: 0, margin: 0 }} onClick={handleClick}>
            <OpenIcon sx={{ color: colors.text, fontSize: 13 }} />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
}
