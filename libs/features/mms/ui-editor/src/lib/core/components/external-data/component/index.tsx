import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import { BasicContainer } from '../../../../elements';

const ExternalDataComponent = (props: {id: string, img_alt: string, image: string}) => {
  const {
    id, image, img_alt
  } = props;

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
    <BasicContainer id={id} sx={{margin: 0}}>
      <Box
        aria-label={img_alt + " Component Image"}
        sx={{
          width: '100%',
          position: 'relative',
          paddingBottom: `${paddingPercentage}%`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${image})`,
        }}
      >
      </Box>
    </BasicContainer>
  );
};

export default ExternalDataComponent;
