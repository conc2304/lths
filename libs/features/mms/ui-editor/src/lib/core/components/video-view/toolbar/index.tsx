import { ChangeEvent } from 'react';

import { BasicTextField, CardContainer } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { VideoComponentProps } from '../../types';

const VideoToolbar = (props: VideoComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { image, video_link },
  } = props;

  const { handleImageChange, updateComponentProp } = useToolbarChange();
  const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponentProp('video_link', event.target.value);
  };

  return (
    <CardContainer id={`${id}_toolbar`}>
      <BasicTextField label={'Image URL'} value={image} onChange={handleImageChange} />
      <BasicTextField label={'Video URL'} value={video_link} onChange={handleVideoChange} />
    </CardContainer>
  );
};
export default VideoToolbar;
