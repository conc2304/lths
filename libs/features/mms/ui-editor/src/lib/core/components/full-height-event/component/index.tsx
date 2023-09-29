import { useMemo } from 'react';
import { Stack, Typography } from '@mui/material';

import placeholder from '../../../../../assets/placeholder_3_2.svg';
import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import { Carousel } from '../../common';
import FullHeightItem from '../../common/full-height-item';
import { FullHeightEventComponentProps } from '../../types';

const FullHeightEventComponent = (props: FullHeightEventComponentProps) => {
  const {
    __ui_id__: id,
    data: { max_size, title, btn_text },
  } = props;

  const eventComponents = useMemo(() => {
    const components = [];
    for (let i = 0; i < Number(max_size); i++) {
      components.push(
        <FullHeightItem key={`fullHeightItem_${i}`} title="Title" description="description" image={placeholder} />
      );
    }
    return components;
  }, [max_size]);

  return (
    <BasicContainer id={id}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={3}>
        <Typography fontSize="1.5rem" fontWeight={500} color={colors.editor.text}>
          {title}
        </Typography>
        <Typography fontSize="0.875rem" fontWeight={400} color={colors.editor.smallText}>
          {btn_text}
        </Typography>
      </Stack>
      <Carousel items={eventComponents} />
    </BasicContainer>
  );
};

export default FullHeightEventComponent;
