import SiloTextAndButtonEditor from './editor';
import { ToolbarLabel } from '../../../../../elements';
import { ToolContainer } from '../../../../../elements/containers';
import { SiloTextAndButtonComponentProps } from '../../../types';

const SiloTextAndButtonToolbar = (props: SiloTextAndButtonComponentProps) => {
  const { __ui_id__: id } = props;

  return (
    <ToolContainer id={id} aria-label="Silo Text And Button Toolbar">
      <ToolbarLabel label={'Promotion'} />
      <SiloTextAndButtonEditor {...props} />
    </ToolContainer>
  );
};
export default SiloTextAndButtonToolbar;
