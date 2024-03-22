import SiloTextAndButtonEditor from './editor';
import { ToolbarLabel } from '../../../../../elements';
import { ToolPreviewContainer } from '../../../common';
import { SiloTextAndButtonComponentProps } from '../../../types';

const SiloTextAndButtonToolbar = (props: SiloTextAndButtonComponentProps) => {
  const { __ui_id__: id, onPropChange } = props;

  return (
    <ToolPreviewContainer onPropChange={onPropChange} id={id} aria-label="Silo Text And Button Toolbar">
      <ToolbarLabel label={'Promotion'} />
      <SiloTextAndButtonEditor {...props} />
    </ToolPreviewContainer>
  );
};
export default SiloTextAndButtonToolbar;
