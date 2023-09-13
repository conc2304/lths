import { CardMedia, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { CardContainer } from '../../../../elements';
import { VideoViewComponentProps } from '../../types';

const VideoViewComponent = (props: VideoViewComponentProps) => {
  const {
    __ui_id__: id,
    data: { image },
  } = props;

  return (
    <CardContainer id={id}>
      <div style={{ position: 'relative' }}>
        <CardMedia
          component="img"
          alt="Image"
          height="auto"
          image={image}
          sx={{ position: 'relative', width: '100%', height: 'auto' }}
        />
        <IconButton
          size="medium"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(30, 30, 30, 0.5)',
            boxShadow: '0 0 0 1px white',
            '&:hover': {
              backgroundColor: 'rgba(30, 30, 30, 0.5)',
            },
          }}
        >
          <PlayArrowIcon sx={{ color: 'white', fontSize: '14px' }} />
        </IconButton>
      </div>
    </CardContainer>
  );
};
export default VideoViewComponent;
