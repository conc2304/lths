import { Box, Stack, Typography } from '@mui/material';

import { MOBILE_SCREEN_HEIGHT, MOBILE_SCREEN_WIDTH } from '../../../../common';
import colors from '../../../../common/colors';
import { HeroContainer } from '../../../../elements';
import { QuickLinkListComponent } from '../../common';
import { HeroComponentProps } from '../../types';

const HeroComponent = (props: HeroComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { image, title, link_title, component_data },
  } = props;
  return (
    <HeroContainer id={`${id}_component`} width={MOBILE_SCREEN_WIDTH} height={MOBILE_SCREEN_HEIGHT} image={image}>
      <Stack flexDirection={'column'} justifyContent={'space-between'}>
        <Typography
          sx={{ paddingBottom: 0.5, fontSize: 20, fontWeight: 600, color: '#ffffff', wordWrap: 'break-word' }}
        >
          {title}
        </Typography>

        <QuickLinkListComponent data={component_data} title={link_title} />
      </Stack>
    </HeroContainer>
  );
};
export default HeroComponent;
