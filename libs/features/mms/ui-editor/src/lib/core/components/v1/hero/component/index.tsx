import { Stack, Typography } from '@mui/material';

import { MOBILE_SCREEN_WIDTH } from '../../../../../common';
import { HeroContainer } from '../../../../../elements';
import { QuickLinkListComponent } from '../../../common';
import { HeroComponentProps } from '../../../types';

const HeroComponent = (props: HeroComponentProps) => {
  const {
    __ui_id__: id,
    data: { image, title, link_title, sub_component_data },
  } = props;
  const height = 690;
  return (
    <HeroContainer id={id} width={MOBILE_SCREEN_WIDTH} height={height} image={image} disableGutter>
      <Stack flexDirection={'column'} justifyContent={'space-between'}>
        <Typography
          sx={{ paddingBottom: 0.5, fontSize: 20, fontWeight: 600, color: '#ffffff', wordWrap: 'break-word' }}
        >
          {title}
        </Typography>

        <QuickLinkListComponent data={sub_component_data} title={link_title} />
      </Stack>
    </HeroContainer>
  );
};
export default HeroComponent;
