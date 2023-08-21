import { Stack } from '@mui/material';

import QuickLinkButtonComponent from '../../common/quick-link-button/component';
import { BasicContainer } from '../../../../elements';
import { QuicklinkButtonGroupComponentProps } from '../../types';


const QuicklinkButtonGroupComponent = (props: QuicklinkButtonGroupComponentProps) => {
  const {
    properties_data: { 
      first_button,
      second_button
    },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id}>
      <Stack direction="row" spacing={1.5}>
        <QuickLinkButtonComponent {...first_button} />
        <QuickLinkButtonComponent {...second_button} />
      </Stack>
    </BasicContainer>
  );
};

export default QuicklinkButtonGroupComponent;
