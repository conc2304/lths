import { Button, Typography, Box, Stack } from '@mui/material';

import PucksDucksIcon from './../../../../../assets/pucks-ducks-icon.svg';
import PucksPanthersIcon from './../../../../../assets/pucks-panthers-icon.svg';
import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import { ScheduleListComponentProps } from '../../types';

const ScheduleListComponent = (props: ScheduleListComponentProps) => {
  const { __ui_id__: id } = props;

  return (
    <BasicContainer id={id}>
      <Box
        sx={{
          padding: 1.5,
          background: colors.card.background,
          boxShadow: colors.card.boxShadow,
          marginBottom: 2.5,
          borderRadius: 2.5,
          marginTop: 1.5,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            width={84}
            height={84}
            borderRadius="50%"
            sx={{ background: colors.card.background }}
          >
            <img src={PucksPanthersIcon} alt="team logo" />
          </Stack>
          <Stack>
            <Typography sx={{ fontSize: '2rem', fontWeight: 600 }} color={colors.editor.subText}>
              2
            </Typography>
          </Stack>
          <Stack direction="column" alignItems="center">
            <Typography fontWeight={450} color={colors.editor.text}>
              Final
            </Typography>
            <Typography fontSize="0.875rem" color={colors.editor.subText}>
              Dec, 1
            </Typography>
          </Stack>
          <Stack>
            <Typography sx={{ fontSize: '2rem', fontWeight: 600 }} color={colors.editor.text}>
              4
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            width={84}
            height={84}
            borderRadius="50%"
            sx={{ background: colors.card.background }}
          >
            <img src={PucksDucksIcon} alt="team logo" />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ marginX: 2, fontSize: 1.5 }}>
          <Typography
            fontSize="1.5rem"
            letterSpacing="0.28px"
            textTransform="uppercase"
            color={colors.editor.text}
            lineHeight="2rem"
          >
            FLA
          </Typography>
          <Typography
            fontSize="1.5rem"
            letterSpacing="0.28px"
            textTransform="uppercase"
            color={colors.editor.text}
            lineHeight="2rem"
          >
            ANA
          </Typography>
        </Stack>
        <Button
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
            color: colors.editor.text,
            border: `1px solid ${colors.button.border}`,
            borderRadius: '2rem',
            paddingY: 1.5,
            marginTop: 1.5,
            '&:hover': {
              color: colors.editor.text,
            },
            textTransform: 'none',
          }}
          fullWidth
          variant="outlined"
        >
          Game Recap
        </Button>
      </Box>
    </BasicContainer>
  );
};

export default ScheduleListComponent;
