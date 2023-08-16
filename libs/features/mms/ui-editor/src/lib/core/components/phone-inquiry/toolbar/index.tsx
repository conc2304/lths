import { ChangeEvent } from 'react';
import { MenuItem, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { BasicTextField, ColorPicker } from '../../../../elements';
import { BasicContainer } from '../../../../elements/containers';
import { useToolbarChange } from '../../hooks';
import { PhoneInquiryComponentProps } from '../../types';

const PhoneInquiryToolbar = (props: PhoneInquiryComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { title, desc, linkcolor, linktitle, action },
  } = props;
  const { handleTitleChange, handleDescChange, updateComponentProp, handleActionChange } = useToolbarChange();

  const handleLinkTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('linktitle', event.target.value, index);
  };

  const handleColorChange = (color: string) => {
    updateComponentProp('linkcolor', color);
  };

  return (
    <BasicContainer id={id}>
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <BasicTextField label={'Description'} value={desc} onChange={handleDescChange} />
      <ColorPicker label="Link Color" value={linkcolor} onChange={handleColorChange} />
      <BasicTextField label={'Link Title'} value={linktitle} onChange={handleLinkTitleChange} />
      <Stack spacing={2}>
        <Typography>action</Typography>
        <TextField
          value={action?.type}
          onChange={(e) => {
            handleActionChange(e, 'type');
          }}
          label="type"
          select
        >
          <MenuItem value={'native'}>native</MenuItem>
          <MenuItem value={'weblink'}>weblink</MenuItem>
        </TextField>
        <BasicTextField
          label={'Page ID'}
          value={action?.page_id}
          onChange={(e) => {
            handleActionChange(e, 'page_id');
          }}
        />
        <BasicTextField
          label={'Page Link'}
          value={action?.page_link}
          onChange={(e) => {
            handleActionChange(e, 'page_link');
          }}
        />
      </Stack>
    </BasicContainer>
  );
};
export default PhoneInquiryToolbar;
