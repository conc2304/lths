import { ChangeEvent } from 'react';

import { ToolbarProps } from '../../../../../context';
import { GroupLabel, OutlinedTextField, SwitchButton } from '../../../../../elements';
import { ActionToolbar } from '../../../common';
import { mergeChildKeys } from '../../../hooks/utils';
import { HeroGameBoxPostGameProps, ItemPositionalProps } from '../../../types';

type Props = HeroGameBoxPostGameProps &
  ItemPositionalProps & {
    onPostGamePropChange: (key: string, value: string | boolean) => void;
    onPropChange: ToolbarProps['onPropChange'];
  };

const PostGameToolbar = (props: Props) => {
  const {
    show_final_text,
    show_highlights_btn,
    btn_text_play_icon,
    btn_text,
    onPostGamePropChange,
    onPropChange,
    btn_action,
    index,
    keys,
    childKeys,
  } = props;
  const mergedChildKeys = mergeChildKeys(childKeys, 'postgame');

  const handleButtonTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onPostGamePropChange('btn_text', e.target.value);
  };

  const handleShowFinalTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onPostGamePropChange('show_final_text', e.target.checked);
  };

  const handleShowHighlightsBtnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onPostGamePropChange('show_highlights_btn', e.target.checked);
  };

  const handleShowBtnTextPlayIconChange = (e: ChangeEvent<HTMLInputElement>) => {
    onPostGamePropChange('btn_text_play_icon', e.target.checked);
  };

  return (
    <>
      <GroupLabel label="Toggle" />
      <SwitchButton isChecked={show_final_text} onChange={handleShowFinalTextChange} label="Show final text" />
      <SwitchButton
        isChecked={show_highlights_btn}
        onChange={handleShowHighlightsBtnChange}
        label="Show highlights button"
      />
      <SwitchButton
        isChecked={btn_text_play_icon}
        onChange={handleShowBtnTextPlayIconChange}
        label="Show play icon button text"
      />
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

export default PostGameToolbar;
