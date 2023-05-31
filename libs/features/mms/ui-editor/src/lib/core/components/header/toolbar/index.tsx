import { ChangeEvent } from 'react';
import { TextField, MenuItem, Typography} from '@mui/material';

import { 
  ToolContainer,
  ColorTextField,
  BasicTextField,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { HeaderComponentProps } from '../../types';

const HeaderToolbar = (props: HeaderComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { color = '#000000', title, desc, action },
  } = props;

  const { handleTitleChange, handleDescChange, handleActionChange, updateComponentProp } = useToolbarChange();

  const handleColorChange = (color: string) => {
    updateComponentProp('color', color);
  };

  const handleActionTypeChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    handleActionChange(event, "type");
  }

  const handleActionPageIdChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    handleActionChange(event, "page_id");
  }
  const handleActionPageLinkChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    handleActionChange(event, "page_link");
  }

  return (
    <ToolContainer id={id}>
      <ColorTextField 
        label={'Title'} value={title} onChange={handleTitleChange}
        colorValue={color} onColorChange={handleColorChange}
      />
      <BasicTextField label={'Description'} value={desc} onChange={handleDescChange} />
      <Accordion>
        <AccordionSummary>
          <Typography>action</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            value={action?.type}
            onChange={handleActionTypeChange}
            label="type"
            select
          >
            <MenuItem value={"native"}>native</MenuItem>
            <MenuItem value={"weblink"}>weblink</MenuItem>
          </TextField>
          <BasicTextField label={'Page Id'} value={action?.page_id} onChange={handleActionPageIdChange} />
          <BasicTextField label={'Page Link'} value={action?.page_link} onChange={handleActionPageLinkChange} />
        </AccordionDetails>
      </Accordion>
    </ToolContainer>
  );
};
export default HeaderToolbar;
