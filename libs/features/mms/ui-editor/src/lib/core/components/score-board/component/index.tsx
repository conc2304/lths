import { Box, Stack, Typography } from '@mui/material';

import { BasicContainer } from '../../../../elements/containers';
import { ScoreBoardComponentProps } from '../../types';

const ScoreDisplay = ({ mine, theirs }) => {
  const highlight = Number(mine) < Number(theirs);
  const style = { fontWeight: 500, fontSize: 32, color: highlight && '#797979', lineHeight: 1 };
  return <Typography sx={style}>{mine}</Typography>;
};
const TeamLogoDisplay = ({ url, team, info }) => {
  return (
    <Stack flexDirection={'column'} justifyContent={'flex-end'} alignItems={'center'}>
      <Box>
        <img src={url} height={32} alt={`${team} logo`} />
      </Box>
      <Typography sx={{ fontWeight: 400, fontSize: 12, color: '#797979' }}>{info}</Typography>
    </Stack>
  );
};
const ScoreBoardComponent = (props: ScoreBoardComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { date_info, match_name, hint, left, right },
  } = props;
  const team = `${left.name} @ ${right.name}`;
  //TODO: cleanup style , split into components

  return (
    <BasicContainer id={`${id}_component`}>
      <Box>
        <Box
          sx={{
            background: '#BA9765',

            height: 36,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Typography sx={{ color: '#ffffff', fontSize: 14 }}>{date_info}</Typography>
        </Box>
        <Box sx={{ border: 'solid 1px #EDEDED', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
          <Box sx={{ height: 22 }}></Box>
          <Stack flexDirection={'row'} justifyContent={'space-around'}>
            <TeamLogoDisplay team={left.name} url={left.logo} info={left.info} />
            <Stack flexDirection={'column'} justifyContent={'flex-end'} alignItems={'center'}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, marginBottom: 2, textTransform: 'uppercase' }}>
                {team}
              </Typography>
              <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <ScoreDisplay mine={left.point} theirs={right.point} />
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 12,
                    paddingRight: 1.5,
                    paddingLeft: 1.5,
                    textTransform: 'uppercase',
                  }}
                >
                  {match_name}
                </Typography>
                <ScoreDisplay mine={right.point} theirs={left.point} />
              </Stack>
              <Typography sx={{ fontWeight: 400, fontSize: 12, color: '#797979' }}>{hint}</Typography>
            </Stack>
            <TeamLogoDisplay team={right.name} url={right.logo} info={right.info} />
          </Stack>
          <Box sx={{ height: 22 }}></Box>
          <Stack sx={{ flexDirection: 'row', textAlign: 'center', borderTop: 'solid 1px #EDEDED' }}>
            <Box sx={{ flex: 1, padding: 1.5, borderRight: 'solid 1px #EDEDED' }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14 }}>LISTEN</Typography>
            </Box>
            <Box sx={{ flex: 1, padding: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14 }}>WATCH</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </BasicContainer>
  );
};
export default ScoreBoardComponent;
