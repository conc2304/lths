import { ChangeEvent } from 'react';

import { GroupLabel, SwitchButton } from '../../../../../elements';
import { HeroGameBoxPreGameProps } from '../../../types';

type Props = HeroGameBoxPreGameProps & {
  onPreGamePropChange: (key: string, value: string | boolean) => void;
};

const PreGameToolbar = (props: Props) => {
  const { show_at_text, show_date_text, show_time_text, onPreGamePropChange } = props;

  const handleShowAtTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onPreGamePropChange('show_at_text', e.target.checked);
  };

  const handleShowDateTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onPreGamePropChange('show_date_text', e.target.checked);
  };

  const handleShowTimeTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onPreGamePropChange('show_time_text', e.target.checked);
  };

  return (
    <>
      <GroupLabel label="Toggle" />
      <SwitchButton isChecked={show_at_text} onChange={handleShowAtTextChange} label="Show at text" />
      <SwitchButton isChecked={show_date_text} onChange={handleShowDateTextChange} label="Show date text" />
      <SwitchButton isChecked={show_time_text} onChange={handleShowTimeTextChange} label="Show time text" />
    </>
  );
};

export default PreGameToolbar;
