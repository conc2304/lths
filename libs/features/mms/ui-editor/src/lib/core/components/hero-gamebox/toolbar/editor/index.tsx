import { ChangeEvent } from 'react';
import { MenuItem, TextField } from '@mui/material';

import { GroupLabel, SimpleImagePicker, SwitchButton } from '../../../../../elements';
import { useToolbarChange } from '../../../hooks';
import { GameEventState, HeroGameboxComponentProps, ItemPositionalProps } from '../../../types';
import InGameToolbar from '../in-game';
import PostGameToolbar from '../post-game';
import PreGameToolbar from '../pre-game';

export type GameboxEditorProps = HeroGameboxComponentProps & ItemPositionalProps;

const GameBoxEditor = (props: GameboxEditorProps) => {
  const {
    data: { pregame, ingame, postgame, image, editor_meta_data, title, show_greetings = false },
    onPropChange,
    index,
    keys,
    childKeys = [],
    showHeader = true,
  } = props;

  const { handlePropChange } = useToolbarChange();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handlePropChange('title', event.target.value, index, keys, childKeys);
  };

  const handleShowGreetingsPropchange = (event: ChangeEvent<HTMLInputElement>) => {
    handlePropChange('show_greetings', event.target.checked, index, keys, childKeys);
  };

  const handleImageChange = (value: string) => {
    handlePropChange('image', value, index, keys, childKeys);
  };

  const handleEventStateChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    handlePropChange('editor_meta_data', { game_event_state: event.target.value }, index, keys, childKeys);
  };

  const handlePreGamePropChange = (key: string, value: string | boolean) => {
    handlePropChange('pregame', { ...(pregame || {}), [key]: value }, index, keys, childKeys);
  };

  const handleInGamePropChange = (key: string, value: string | boolean) => {
    handlePropChange('ingame', { ...(ingame || {}), [key]: value }, index, keys, childKeys);
  };

  const handlePostGamePropChange = (key: string, value: string | boolean) => {
    handlePropChange('postgame', { ...(postgame || {}), [key]: value }, index, keys, childKeys);
  };

  const { PRE_GAME, IN_GAME, POST_GAME } = GameEventState;

  const eventState = editor_meta_data ? editor_meta_data.game_event_state : PRE_GAME;

  return (
    <>
      <SimpleImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      {showHeader && (
        <>
          <TextField value={title} onChange={handleTitleChange} label="Title" fullWidth />
          <SwitchButton isChecked={show_greetings} onChange={handleShowGreetingsPropchange} label="Show Greetings" />
        </>
      )}
      <GroupLabel label="Game Events" />
      <TextField value={eventState} onChange={handleEventStateChange} label="Event State" select fullWidth>
        <MenuItem value={PRE_GAME}>Pre Game</MenuItem>
        <MenuItem value={IN_GAME}>In Game</MenuItem>
        <MenuItem value={POST_GAME}>Post Game</MenuItem>
      </TextField>
      {eventState === PRE_GAME && <PreGameToolbar {...pregame} onPreGamePropChange={handlePreGamePropChange} />}
      {eventState === IN_GAME && (
        <InGameToolbar
          {...ingame}
          index={index}
          keys={keys}
          childKeys={childKeys}
          onInGamePropChange={handleInGamePropChange}
          onPropChange={onPropChange}
        />
      )}
      {eventState === POST_GAME && (
        <PostGameToolbar
          {...postgame}
          index={index}
          keys={keys}
          childKeys={childKeys}
          onPropChange={onPropChange}
          onPostGamePropChange={handlePostGamePropChange}
        />
      )}
    </>
  );
};

export default GameBoxEditor;
