import { Box, Typography } from '@mui/material';

import { CardComponentProps } from '../../types';

const CardComponent = (props: CardComponentProps) => {
  const {
    default_data: { image, title, desc },
    __ui_id__: id,
  } = props;
  const perc = (245 / 335) * 100;
  return (
    <Box
      sx={{
        backgroundImage: `url(${require(image ? image : '../../../../assets/card-view.png')})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: 0,
        position: 'relative',
        /* (image-height / image-width * width) */
        /*  (245 / 335) * 100 */
        paddingTop: `${perc}%`,
      }}
    >
      <Box
        id={`${id}_component`}
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,

          display: 'flex',
        }}
      >
        <Box sx={{ alignSelf: ' flex-end', margin: 2 }}>
          <Typography
            sx={{ paddingBottom: 0.5, fontSize: 20, fontWeight: 600, color: '#ffffff', wordWrap: 'break-word' }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontSize: 10, color: '#ffffff', wordWrap: 'break-word' }}>{desc}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default CardComponent;
