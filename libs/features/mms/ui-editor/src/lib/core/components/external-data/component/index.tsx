import React, { useState, useEffect } from 'react';
import { Box, SxProps } from '@mui/material';

import { BasicContainer } from '../../../../elements';

const ExternalDataComponent = (props: { id: string; img_alt: string; image: string; sx?: SxProps }) => {
  const { id, image, img_alt, sx = {} } = props;

  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = image;

    img.onload = () => {
      const imgAspectRatio = img.height / img.width;
      setAspectRatio(imgAspectRatio);
    };
  }, []);

  const paddingPercentage = aspectRatio ? aspectRatio * 100 : 56.25;

  return (
    <BasicContainer id={id} sx={sx}>
      <Box
        aria-label={img_alt + ' Component Image'}
        sx={{
          width: '100%',
          position: 'relative',
          paddingBottom: `${paddingPercentage}%`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${image})`,
        }}
      ></Box>
    </BasicContainer>
  );
};

export default ExternalDataComponent;
