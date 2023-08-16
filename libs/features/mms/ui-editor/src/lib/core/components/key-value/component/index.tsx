import { Stack, Typography } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { KeyValueComponentProps } from '../../types';

const KeyValueComponent = (props: KeyValueComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { title, desc, sub_properties_data },
  } = props;

  return (
    <BasicContainer id={id}>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography gutterBottom variant="body2" component="div">
        {desc}
      </Typography>
      {sub_properties_data.map(({ key, value }, index) => {
        return (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            key={`key_value_${index}`}
          >
            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{key}</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{value}</Typography>
          </Stack>
        );
      })}
    </BasicContainer>
  );
};
export default KeyValueComponent;
