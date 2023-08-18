import { Box } from '@mui/material';

import BasicContainerLabel from '../../../../elements/labels/basic/basiclabel';

const ExternalDataViewComponent = (props: { id: string; image: string }) => {
  const { id, image } = props;
  return (
    <BasicContainerLabel id={id} sx={{ margin: 0 }}>
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          paddingBottom: '31%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${image})`,
        }}
      ></Box>
    </BasicContainerLabel>
  );
};

export default ExternalDataViewComponent;
