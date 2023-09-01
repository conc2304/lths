import { ToolContainer, OutlinedTextField, GroupLabel } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { SpacerProps } from '../../types';

const SpacerToolbar = (props: SpacerProps) => {
  const {
    data: { space },
    __ui_id__: id,
  } = props;
  const { updateComponentProp } = useToolbarChange();

  return (
    <ToolContainer id={id} aria-label="Spacer Toolbar">
      <GroupLabel label={'Spacer'} />
      <OutlinedTextField
        label={'Space'}
        value={space}
        onChange={(e) => updateComponentProp('space', e.target.value)}
        type="number"
      />
    </ToolContainer>
  );
};
export default SpacerToolbar;
