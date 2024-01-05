import { ChangeEvent } from 'react';

import { ToolbarProps } from '../../../../../context';
import { GroupLabel, OutlinedTextField, SwitchButton } from '../../../../../elements';
import { ActionToolbar } from '../../../common';
import { mergeChildKeys } from '../../../hooks/utils';
import { HeroGameBoxInGameProps, ItemPositionalProps } from '../../../types';

type Props = HeroGameBoxInGameProps &
  ItemPositionalProps & {
    onInGamePropChange: (key: string, value: string | boolean) => void;
    onPropChange: ToolbarProps['onPropChange'];
  };

const InGameToolbar = (props: Props) => {
  const {
    show_period_text,
    show_time_remain_text,
    show_stats_btn,
    btn_text,
    btn_action,
    onInGamePropChange,
    onPropChange,
    index,
    keys,
    childKeys,
  } = props;
  const mergedChildKeys = mergeChildKeys(childKeys, 'ingame');

  const handleButtonTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInGamePropChange('btn_text', e.target.value);
  };

  const handleShowPeriodTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInGamePropChange('show_period_text', e.target.checked);
  };

  const handleShowTimeRemainTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInGamePropChange('show_time_remain_text', e.target.checked);
  };

  const handleShowStatsBtnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInGamePropChange('show_stats_btn', e.target.checked);
  };
  return (
    <>
      <GroupLabel label="Toggle" />
      <SwitchButton isChecked={show_period_text} label="Show period text" onChange={handleShowPeriodTextChange} />
      <SwitchButton
        isChecked={show_time_remain_text}
        label="Show time remain text"
        onChange={handleShowTimeRemainTextChange}
      />
      <SwitchButton isChecked={show_stats_btn} label="Show stats button" onChange={handleShowStatsBtnChange} />
      <GroupLabel label="Button" />
      <OutlinedTextField label={'Button Text'} value={btn_text} onChange={handleButtonTextChange} />
      <ActionToolbar
        actionPropName="btn_action"
        action={btn_action}
        index={index}
        keys={keys}
        childKeys={mergedChildKeys}
        onPropChange={onPropChange}
      />
    </>
  );
};

export default InGameToolbar;
