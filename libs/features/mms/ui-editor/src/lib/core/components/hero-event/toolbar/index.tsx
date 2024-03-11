import HeroEventEditor from './editor';
import { ToolContainer, ToolbarLabel } from '../../../../elements';
import { HeroEventComponentProps } from '../../types';

const HeroEventToolbar = (props: HeroEventComponentProps) => {
  const { __ui_id__: id } = props;

  return (
    <ToolContainer id={id}>
      <ToolbarLabel label="Hero Event" />
      <HeroEventEditor />
    </ToolContainer>
  );
};

export default HeroEventToolbar;
