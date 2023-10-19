import { Typography } from '@mui/material';

import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import { ReplacedTextComponent } from '../../common/replaced-text';
import { HeadlineTextBlockComponentProps } from '../../types';
import { sizes } from '../utils';

const HeadlineTextBlockComponent = (props: HeadlineTextBlockComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, text_size, linked_text = [] },
  } = props;
  const fontSize = sizes.find((s) => s.value === text_size)?.fontSize;

  return (
    <BasicContainer id={id}>
      <Typography sx={{ fontSize: fontSize, color: colors.editor.text }} variant="h3">
        <ReplacedTextComponent title={title} linked_text={linked_text} color={colors.editor.text} />
      </Typography>
    </BasicContainer>
  );
};
export default HeadlineTextBlockComponent;
