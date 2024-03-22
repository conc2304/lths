import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { BrokenImage } from '@mui/icons-material';

import { GameCenterComponentProps } from '../../types';

const ImageFallback = (): JSX.Element => (
  <Box
    sx={{
      height: 200,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <BrokenImage fontSize="large" color="inherit" />
  </Box>
);

const GameCenterComponent: React.FC<GameCenterComponentProps> = (props: GameCenterComponentProps) => {
  const { __ui_id__: id } = props;
  const [imageFound, setImageFound] = useState(true);

  //TODO: Replace this hard-coded image_url with the props.image_url once server started sending image_url for every component in the page detail response.
  const image_url = 'https://devblobstorageacc.blob.core.windows.net/files-lths-dev/files-lths-mok-dev/cGameCenter.svg';

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageFound(true);
    img.onerror = () => setImageFound(false);
    img.src = image_url;
  }, [image_url]);

  return (
    <Box
      key={id}
      sx={{
        width: '100%',
        height: '100vh',
      }}
    >
      {imageFound ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ) : (
        <ImageFallback />
      )}
    </Box>
  );
};

export default GameCenterComponent;
