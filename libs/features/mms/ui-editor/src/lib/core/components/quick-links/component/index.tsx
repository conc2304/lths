import { Grid } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import QuickLinkComponent from '../../common/quick-link/component';
import { QuickLinksProps } from '../../types';

const QuickLinksComponent = (props: QuickLinksProps) => {
  const {
    __ui_id__: id,
    default_data: { component_data },
  } = props;

  return (
    <BasicContainer id={id}>
      <Grid container spacing={2}>
        {component_data?.map((props, i) => {
          return (
            <Grid item xs={12} sm={4} key={`quick_link_${i}`}>
              <QuickLinkComponent {...props} />
            </Grid>
          );
        })}
      </Grid>
    </BasicContainer>
  );
};

export default QuickLinksComponent;
