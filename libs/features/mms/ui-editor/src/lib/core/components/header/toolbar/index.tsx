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
export default HeaderToolbar;
