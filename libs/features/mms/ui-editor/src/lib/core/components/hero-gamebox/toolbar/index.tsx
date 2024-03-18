import GameBoxEditor from './editor';
import { ToolContainer, ToolbarLabel } from '../../../../elements';
import { HeroGameboxComponentProps } from '../../types';

const HeroGameboxToolbar = (props: HeroGameboxComponentProps) => {
  const { __ui_id__: id } = props;

  return (
    <ToolContainer id={id}>
      <ToolbarLabel label="Gamebox" />
      <GameBoxEditor {...props} />
    </ToolContainer>
  );
};

export default HeroGameboxToolbar;
