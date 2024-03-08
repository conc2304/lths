import CardTextEditor from './editor';
import { ToolbarLabel } from '../../../../../elements';
import { ToolPreviewContainer } from '../../../common';
import { CardTextComponentProps } from '../../../types';

const CardTextToolbar = (props: CardTextComponentProps) => {
  const { __ui_id__: id, onPropChange } = props;

  return (
    <ToolPreviewContainer onPropChange={onPropChange} id={id} aria-label={'Card Text Toolbar'}>
      <ToolbarLabel label={'Hero Promotion'} />
      <CardTextEditor {...props} />
    </ToolPreviewContainer>
  );
};
export default CardTextToolbar;
