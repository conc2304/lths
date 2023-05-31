import { Button, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export type VendorCardProps = {
  image: string;
  title: string;
  sub_title: string;
  desc: string;
  action: { page_link: string };
  btn_title: string;
};

const colors = { brand: { primary: '#111921', secondary: '#BA9765' }, text: '#ffffff' };

export default function VendorCard({ image, title, desc, sub_title, btn_title, action }: VendorCardProps) {
  const handleClick = () => {
    window.open(action.page_link, '_blank');
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="150" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color={'#000'}>
          {title}
        </Typography>
        <Typography
          gutterBottom
          fontSize={11}
          component="div"
          color="text.secondary"
          fontWeight={500}
          textTransform={'uppercase'}
        >
          {sub_title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '1rem' }}>
          {desc}
        </Typography>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={handleClick}
            sx={{
              paddingX: '1.1rem',
              paddingY: '0.35rem',
              backgroundColor: '#BA9765',
              color: colors.text,
              marginTop: '1rem',
              '&:hover': {
                backgroundColor: '#BA9765', // This will keep the background color same on hover
              },
            }}
          >
            {btn_title}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
