import { ButtonStyleLoopkups } from '../../../../common';
import { CardContainer, SegmentedButton, BasicTextField } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { ButtonComponentProps } from '../../types';

const ButtonToolbar = (props: ButtonComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { style, title },
  } = props;

  const { handleTitleChange, updateComponentProp } = useToolbarChange();

  const handleStyleChange = (style: string) => {
    updateComponentProp('style', style);
  };

  return (
    <CardContainer id={`${id}_toolbar`} aria-label="Button Toolbar">
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <SegmentedButton label={'Style'} onValueChange={handleStyleChange} data={ButtonStyleLoopkups} value={style} />
    </CardContainer>
  );
};
export default ButtonToolbar;
