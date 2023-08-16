import { ChangeEvent } from 'react';
import { Typography } from '@mui/material';

import {
  BasicTextField,
  ToolContainer,
  ImagePicker,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Action,
} from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { ActionProps, VideoViewComponentProps } from '../../types';

const VideoViewToolbar = (props: VideoViewComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { image, video_link, action = {} as ActionProps },
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
      <Accordion>
        <AccordionSummary>
          <Typography>action</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Action {...action} />
        </AccordionDetails>
      </Accordion>
    </ToolContainer>
  );
};
export default VideoViewToolbar;
