import { ChangeEvent } from 'react';
import { MenuItem, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { BasicTextField } from '../../../../elements';
import { BasicContainer } from '../../../../elements/containers';
import { useToolbarChange } from '../../hooks';
import { PhoneInquiryComponentProps } from '../../types';

const PhoneInquiryToolbar = (props: PhoneInquiryComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { title, desc, linkcolor, linktitle, action },
  } = props;
  const { handleTitleChange, handleDescChange, updateComponentProp } = useToolbarChange();

  const handleLinkTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('linktitle', event.target.value, index);
  };

  const handleLinkColorChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('linkcolor', event.target.value, index);
  };
  const handleActionChange = (key: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponentProp('action', { ...props.default_data.action, [key]: event.target.value });
  };

  return (
    <BasicContainer id={id}>
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <BasicTextField label={'Description'} value={desc} onChange={handleDescChange} />
      <BasicTextField label={'Link Color'} value={linkcolor} onChange={handleLinkColorChange} />
      <BasicTextField label={'Link Title'} value={linktitle} onChange={handleLinkTitleChange} />
      <Stack spacing={2}>
        <Typography>action</Typography>
        <TextField
          value={action?.type}
          onChange={(e) => {
            handleActionChange('type', e);
          }}
          label="type"
          select
        >
          <MenuItem value={'native'}>native</MenuItem>
          <MenuItem value={'weblink'}>weblink</MenuItem>
        </TextField>
        <BasicTextField
          label={'Page_ID'}
          value={action?.page_id}
          onChange={(e) => {
            handleActionChange('page_id', e);
          }}
        />
        <BasicTextField
          label={'Page_Link'}
          value={action?.page_link}
          onChange={(e) => {
            handleActionChange('page_link', e);
          }}
        />
      </Stack>
    </BasicContainer>
  );
};
export default PhoneInquiryToolbar;
