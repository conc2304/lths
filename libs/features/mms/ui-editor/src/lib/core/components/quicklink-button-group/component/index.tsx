import { Stack } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import QuickLinkButtonComponent from '../../common/quick-link-button/component';
import { QuicklinkButtonGroupComponentProps } from '../../types';

const QuicklinkButtonGroupComponent = (props: QuicklinkButtonGroupComponentProps) => {
  const {
    data: { sub_component_data },
    __ui_id__: id,
  } = props;

  return (
    <BasicContainer id={id}>
      <Stack direction="row" spacing={1.5} id={id}>
        {sub_component_data.map((row, index) => (
          <QuickLinkButtonComponent key={index} title={row.title} icon={row.icon} />
        ))}
      </Stack>
    </BasicContainer>
  );
};

export default QuicklinkButtonGroupComponent;
