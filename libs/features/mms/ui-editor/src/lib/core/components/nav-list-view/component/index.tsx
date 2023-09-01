import { Stack, Typography, Divider } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { BasicContainer } from '../../../../elements';
import { NavListViewComponentProps } from '../../types';

const NavListViewComponent = (props: NavListViewComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
  } = props;

  return (
    <BasicContainer id={id}>
      <Stack direction="column" divider={<Divider orientation="horizontal" flexItem />} spacing={1.3}>
        {sub_component_data.map(({ title }, index) => {
          return (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              key={`nav_item_${index}`}
            >
              <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{title}</Typography>
              <KeyboardArrowRightIcon />
            </Stack>
          );
        })}
      </Stack>
    </BasicContainer>
  );
};
export default NavListViewComponent;
