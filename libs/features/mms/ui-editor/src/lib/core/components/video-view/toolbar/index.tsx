import { ChangeEvent } from 'react';

import { BasicTextField, ToolContainer, ImagePicker } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { VideoComponentProps } from '../../types';

const VideoToolbar = (props: VideoComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { image, video_link },
    onPropChange,
  } = props;

  const { handleImageChange, updateComponentProp } = useToolbarChange();
  const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponentProp('video_link', event.target.value);
  };

  return (
    <ToolContainer id={id}>
      <ImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      <BasicTextField label={'Video URL'} value={video_link} onChange={handleVideoChange} />
    </ToolContainer>
  );
};
export default VideoToolbar;
