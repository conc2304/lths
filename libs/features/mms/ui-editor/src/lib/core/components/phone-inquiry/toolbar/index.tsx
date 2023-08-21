import { ChangeEvent } from 'react';
import { Stack } from '@mui/system';

import { ActionAccordion, BasicTextField, ColorPicker } from '../../../../elements';
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
      <ColorPicker label={'Link Color'} value={linkcolor} onChange={handleColorChange} />
      <BasicTextField label={'Link Title'} value={linktitle} onChange={handleLinkTitleChange} />
      <Stack spacing={2}>
        <ActionAccordion action={action} handleActionChange={handleActionChange} />
      </Stack>
    </BasicContainer>
  );
};
export default PhoneInquiryToolbar;
