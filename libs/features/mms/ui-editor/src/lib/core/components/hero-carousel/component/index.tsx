import { Box } from '@mui/material';

import { getGreetingBasedOnTimeOfToday } from '@lths/shared/ui-elements';

import { HERO_HEIGHT } from '../../../../common';
import colors from '../../../../common/colors';
import { BasicContainer, HeroCarousel } from '../../../../elements';
import { HeroCarouselComponentProps } from '../../types';

const HeroCarouselComponent = (props: HeroCarouselComponentProps) => {
  const {
    data: { sub_component_data = [], editor_meta_data, title, show_greetings },
    __ui_id__: id,
  } = props;

  const selectedSlideIndex = editor_meta_data ? editor_meta_data.selectedSlideIndex : 0;

  const greetingText = getGreetingBasedOnTimeOfToday();

  const headerText = show_greetings ? greetingText : title;

  return (
    <BasicContainer id={id} sx={{ marginX: 0 }}>
      {sub_component_data.length === 0 ? (
        <Box bgcolor={colors.hero.background} height={HERO_HEIGHT}></Box>
      ) : (
        <HeroCarousel items={sub_component_data} selectedSlideIndex={selectedSlideIndex} headerText={headerText} />
      )}
    </BasicContainer>
  );
};

export default HeroCarouselComponent;
