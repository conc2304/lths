import CardTextOverlayAndButtonEditor from './editor';
import { ToolbarLabel } from '../../../../../elements';
import { ToolPreviewContainer } from '../../../common';
import { CardTextOverlayAndButtonComponentProps } from '../../../types';

const CardTextOverlayAndButtonToolbar = (props: CardTextOverlayAndButtonComponentProps) => {
  const { __ui_id__: id, onPropChange } = props;

  return (
    <ToolPreviewContainer onPropChange={onPropChange} id={id} aria-label={'Card Text Overlay And Button Toolbar'}>
      <ToolbarLabel label={'Promotion'} />
      <CardTextOverlayAndButtonEditor {...props} />
    </ToolPreviewContainer>
  );
};
export default CardTextOverlayAndButtonToolbar;
