import CardTextEditor from './editor';
import { ToolbarLabel } from '../../../../../elements';
import { ToolContainer } from '../../../../../elements/containers';
import { CardTextComponentProps } from '../../../types';

const CardTextToolbar = (props: CardTextComponentProps) => {
  const { __ui_id__: id } = props;

  return (
    <ToolContainer id={id} aria-label={'Card Text Toolbar'}>
      <ToolbarLabel label={'Hero Promotion'} />
      <CardTextEditor {...props} />
    </ToolContainer>
  );
};
export default CardTextToolbar;
