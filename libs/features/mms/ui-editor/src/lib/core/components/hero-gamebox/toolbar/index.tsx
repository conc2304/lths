import { ChangeEvent } from 'react';
import React from 'react';
import { MenuItem, TextField } from '@mui/material';

import InGameToolbar from './in-game';
import PostGameToolbar from './post-game';
import PreGameToolbar from './pre-game';
import { GroupLabel, SimpleImagePicker, ToolContainer, ToolbarLabel, SwitchButton } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { GameEventState, HeroGameboxComponentProps } from '../../types';

const HeroGameboxToolbar = (props: HeroGameboxComponentProps) => {
  const {
    __ui_id__: id,
    data: { pregame, ingame, postgame, image, editor_meta_data, title, show_greetings = false },
    onPropChange,
  } = props;

  const { handlePropChange, handleTitleChange } = useToolbarChange();

  const handleShowGreetingsPropchange = (event: ChangeEvent<HTMLInputElement>) => {
    handlePropChange('show_greetings', event.target.checked);
  };

  const handleImageChange = (value: string) => {
    handlePropChange('image', value, undefined, []);
  };

  const handleEventStateChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    handlePropChange('editor_meta_data', { game_event_state: event.target.value });
  };

  const handlePreGamePropChange = (key: string, value: string | boolean) => {
    handlePropChange('pregame', { [key]: value });
  };

  const handleInGamePropChange = (key: string, value: string | boolean) => {
    handlePropChange('ingame', { [key]: value });
  };

  const handlePostGamePropChange = (key: string, value: string | boolean) => {
    handlePropChange('postgame', { [key]: value });
  };

  const { PRE_GAME, IN_GAME, POST_GAME } = GameEventState;

  const eventState = editor_meta_data ? editor_meta_data.game_event_state : PRE_GAME;

  return (
    <ToolContainer id={id}>
      <ToolbarLabel label="Gamebox" />
      <SimpleImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      <TextField value={title} onChange={handleTitleChange} label="Title" fullWidth />
      <SwitchButton isChecked={show_greetings} onChange={handleShowGreetingsPropchange} label="Show Greetings" />
      <GroupLabel label="Game Events" />
      <TextField value={eventState} onChange={handleEventStateChange} label="Event State" select fullWidth>
        <MenuItem value={PRE_GAME}>Pre Game</MenuItem>
        <MenuItem value={IN_GAME}>In Game</MenuItem>
        <MenuItem value={POST_GAME}>Post Game</MenuItem>
      </TextField>
      {eventState === PRE_GAME && <PreGameToolbar {...pregame} onPreGamePropChange={handlePreGamePropChange} />}
      {eventState === IN_GAME && (
        <InGameToolbar {...ingame} onInGamePropChange={handleInGamePropChange} onPropChange={onPropChange} />
      )}
      {eventState === POST_GAME && (
        <PostGameToolbar {...postgame} onPropChange={onPropChange} onPostGamePropChange={handlePostGamePropChange} />
      )}
    </ToolContainer>
  );
};

export default HeroGameboxToolbar;
