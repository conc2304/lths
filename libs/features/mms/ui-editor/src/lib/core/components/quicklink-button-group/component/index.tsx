import { Stack } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import QuickLinkButtonComponent from '../../common/quick-link-button/component';
import { QuicklinkButtonGroupComponentProps } from '../../types';


const QuicklinkButtonGroupComponent = (props: QuicklinkButtonGroupComponentProps) => {
  const {
    properties_data: { sub_properties_data },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id} 
      sx={{ 
        padding: 2,
        display: 'flex',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, rgba(18, 18, 19, 0) 0%, #121213 100%), linear-gradient(0deg, #242526, #242526)'
      }}
    >
      <Stack direction="row" spacing={1.5}>
        <QuickLinkButtonComponent title={sub_properties_data[0]?.title} icon={sub_properties_data[0]?.icon} />
        <QuickLinkButtonComponent title={sub_properties_data[1]?.title} icon={sub_properties_data[1]?.icon} />
      </Stack>
    </BasicContainer>
  );
};

export default QuicklinkButtonGroupComponent;
