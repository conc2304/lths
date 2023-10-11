import { ChangeEvent } from 'react';
import { Box } from '@mui/material';

import { BasicTextField } from '../../../../../elements';
import { ScoreBoardTeamProps } from '../../../types';

type Props = ScoreBoardTeamProps & {
  onChange: (key: string, vaue: string) => void;
};
const ScoreBoardTeam = ({ logo, name, info, point, onChange }: Props) => {
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('name', event.target.value);
  };
  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('logo', event.target.value);
  };
  const handleInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('info', event.target.value);
  };
  const handleScoreChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('point', event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <BasicTextField label={'Team Name'} value={name} onChange={handleNameChange} />
      <BasicTextField label={'Logo URL'} value={logo} onChange={handleLogoChange} />

      <BasicTextField label={'Points'} value={point} onChange={handleScoreChange} />
      <BasicTextField label={'Info'} value={info} onChange={handleInfoChange} />
    </Box>
  );
};
export default ScoreBoardTeam;
