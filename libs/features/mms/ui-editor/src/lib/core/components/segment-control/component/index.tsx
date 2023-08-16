import React from 'react';
import { Typography, Grid, Button } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { SegmentControlComponentProps } from '../../types';

const SegmentControlComponent = (props: SegmentControlComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { sub_properties_data },
  } = props;
  const [selected, setSelected] = React.useState(sub_properties_data[0].title);
  return (
    <BasicContainer id={id}>
      <Grid container>
        {sub_properties_data.map(({ title }, index) => (
          <Grid item key={`SegmentItem${index}`}>
            <Button
              onClick={() => setSelected(title)}
              sx={{
                backgroundColor: selected === title ? 'white' : '#0f1319',
                color: selected === title ? '#0f1319' : 'white',
                borderRadius: '0px',
                border: '1px solid white',
                '&:hover': {
                  backgroundColor: selected === title ? 'white' : '#0f1319',
                },
              }}
            >
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                sx={{ paddingX: '1rem', color: selected === title ? '#0f1319' : 'white' }}
              >
                {title}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </BasicContainer>
  );
};
export default SegmentControlComponent;
