import { ButtonStyleLoopkups } from '../../../../common';
import { ToolContainer, SegmentedButton, BasicTextField } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { ButtonComponentProps } from '../../types';

const ButtonToolbar = (props: ButtonComponentProps) => {
  const {
    __ui_id__: id,
    data: { style, title },
  } = props;

  const { handleTitleChange, updateComponentProp } = useToolbarChange();

  const handleStyleChange = (style: string) => {
    updateComponentProp('style', style);
  };

  return (
    <ToolContainer id={id} aria-label="Button Toolbar">
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <SegmentedButton label={'Style'} onValueChange={handleStyleChange} data={ButtonStyleLoopkups} value={style} />
    </ToolContainer>
  );
};
export default ButtonToolbar;
