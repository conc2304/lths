import { Stack, Typography, Box } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { BasicContainer } from '../../../../elements';
import { NavCellViewComponentProps } from '../../types';

const NavCellViewComponent = (props: NavCellViewComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
  } = props;

  return (
    <BasicContainer id={id}>
      <Stack direction="column" spacing={1.3}>
        {sub_component_data.map(({ title, icon }, index) => {
          return (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              key={`nav_cell_${index}`}
            >
              <Stack direction="row" justifyContent="center" alignItems="center">
                <Box
                  style={{
                    backgroundColor: '#ba9765',
                    borderTopLeftRadius: '0.2rem',
                    borderBottomLeftRadius: '0.2rem',
                    padding: '0.6rem',
                    marginRight: '0.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img src={icon} alt={icon} loading="lazy" style={{ height: 25, width: 25 }} />
                </Box>
                <Typography sx={{ fontSize: 14 }}>{title}</Typography>
              </Stack>
              <KeyboardArrowRightIcon />
            </Stack>
          );
        })}
      </Stack>
    </BasicContainer>
  );
};
export default NavCellViewComponent;
