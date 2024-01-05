import CardTextOverlayAndButtonEditor from './editor';
import { ToolbarLabel } from '../../../../../elements';
import { ToolContainer } from '../../../../../elements/containers';
import { CardTextOverlayAndButtonComponentProps } from '../../../types';

const CardTextOverlayAndButtonToolbar = (props: CardTextOverlayAndButtonComponentProps) => {
  const { __ui_id__: id } = props;

  return (
    <ToolContainer id={id} aria-label={'Card Text Overlay And Button Toolbar'}>
      <ToolbarLabel label={'Promotion'} />
      <CardTextOverlayAndButtonEditor {...props} />
    </ToolContainer>
  );
};
export default CardTextOverlayAndButtonToolbar;
