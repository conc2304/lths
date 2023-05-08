import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import colors from '../../../../colors';
import { MOBILE_SCREEN_HEIGHT, MOBILE_SCREEN_WIDTH } from '../../../../constants';
import { HeroComponentProps } from '../../types';

const HeroComponent: React.FC<HeroComponentProps> = (props) => {
  const {
    default_data: { image, title, desc, link_title, component_data },
  } = props;
  const perc = (MOBILE_SCREEN_HEIGHT / MOBILE_SCREEN_WIDTH) * 100;
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        // width: '100%',
        height: 0,
        position: 'relative',
        paddingTop: `${perc}%`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,

          display: 'flex',
          padding: 2,
        }}
      >
        <Stack flexDirection={'column'} justifyContent={'space-between'}>
          <Typography
            sx={{ paddingBottom: 0.5, fontSize: 20, fontWeight: 600, color: '#ffffff', wordWrap: 'break-word' }}
          >
            {title}
          </Typography>
          <Box>
            <Box sx={{ marginTop: 'auto', padding: 2 }}>
              <Typography
                sx={{ paddingBottom: 0.5, fontSize: 14, fontWeight: 600, color: '#ffffff', wordWrap: 'break-word' }}
              >
                {link_title}
              </Typography>
            </Box>
            <Stack flexDirection={'row'} gap={1} sx={{ marginRight: 2, marginLeft: 2 }}>
              {component_data?.map((o, i) => {
                return (
                  <Box
                    key={`quick_link_${i}`}
                    sx={{
                      background: colors.quicklink.background,
                      flex: 1,
                      borderRadius: 2,
                      padding: 1,
                      flexDirection: 'column',
                    }}
                  >
                    <img src={o.icon} alt={o.title} style={{ width: 20, height: 20 }} />
                    <Typography sx={{ fontSize: 11 }}>{o.title}</Typography>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
export default HeroComponent;
