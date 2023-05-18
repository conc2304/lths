import { useState } from 'react';
import CardMedia from '@mui/material/CardMedia';

import { CardContainer } from '../../../../elements';
import { VideoComponentProps } from '../../types';

const VideoComponent = (props: VideoComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { image, video_link },
  } = props;
  const [isVideoShown, setIsVideoShown] = useState(false);

  const handleCardClick = () => {
    setIsVideoShown(true);
    alert(1);
  };
  return (
    <CardContainer id={`${id}_component`}>
      <CardMedia
        component={isVideoShown ? 'video' : 'img'}
        src={isVideoShown ? video_link : image}
        onClick={handleCardClick}
        controls={isVideoShown}
        autoPlay={isVideoShown}
      />
    </CardContainer>
  );
};
export default VideoComponent;
