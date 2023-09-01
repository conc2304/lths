import { ChangeEvent } from 'react';

import { BasicTextField, ToolContainer, ImagePicker } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { ActionProps, VideoViewComponentProps } from '../../types';
const VideoViewToolbar = (props: VideoViewComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { image, video_link, action = {} as ActionProps },
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

      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolContainer>
  );
};
export default VideoViewToolbar;
