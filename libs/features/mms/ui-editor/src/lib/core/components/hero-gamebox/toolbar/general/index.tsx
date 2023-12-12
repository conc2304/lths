import React, { ChangeEvent } from 'react';

import { SwitchButton } from '../../../../../elements';
import { HeroGameboxComponentProps } from '../../../types';

type Props = HeroGameboxComponentProps & {
  show_greetings: boolean;
  title: string;
  onGamePropChange: (key: string, value: string | boolean) => void;
};

const SwitchToggle = (props: Props) => {
  const { show_greetings, title, onGamePropChange } = props;
  const handleGamePropChange = (e: ChangeEvent<HTMLInputElement>) => {
    onGamePropChange('show_greetings', e.target.checked);
  };
  return <SwitchButton isChecked={show_greetings} onChange={handleGamePropChange} label="Show Greetings" />;
};

export default SwitchToggle;
