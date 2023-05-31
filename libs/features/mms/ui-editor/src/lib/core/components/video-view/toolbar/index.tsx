import { ChangeEvent } from 'react';
import { TextField, MenuItem, Typography} from '@mui/material';

import { 
  BasicTextField, 
  ToolContainer, 
  ImagePicker,
  Accordion,
  AccordionSummary,
  AccordionDetails
 } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { VideoViewComponentProps } from '../../types';

const VideoViewToolbar = (props: VideoViewComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { image, video_link, action },
    onPropChange,
  } = props;

  const { handleImageChange, handleActionChange, updateComponentProp } = useToolbarChange();

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
          <TextField
            value={action?.type}
            onChange={(e) => {handleActionChange("type", e)}}
            label="type"
            select
          >
            <MenuItem value={"native"}>native</MenuItem>
            <MenuItem value={"weblink"}>weblink</MenuItem>
          </TextField>
          <BasicTextField label={'Page_ID'} value={action?.page_id} onChange={(e) => {handleActionChange("page_id", e)}} />
          <BasicTextField label={'Page_Link'} value={action?.page_link} onChange={(e) => {handleActionChange("page_link", e)}} />
        </AccordionDetails>
      </Accordion>
    </ToolContainer>
  );
};
export default VideoViewToolbar;
