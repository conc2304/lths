import React from 'react';
import { Box } from '@mui/material';

import { GameCenterComponentProps } from '../../types';

const GameCenterComponent: React.FC<GameCenterComponentProps> = (props: GameCenterComponentProps) => {
  const { __ui_id__: id, image_url } = props;
  return (
    <Box
      key={id}
      sx={{
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'fit',
      }}
    />
  );
};

export default GameCenterComponent;
