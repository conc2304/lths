import { Card, CardMedia, Stack } from '@mui/material';

import { BasicContainer } from '../../../../elements/containers';
import { Carousel } from '../../common';
import { CardViewCarouselComponentProps } from '../../types';

const CardViewCarouselComponent = (props: CardViewCarouselComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
  } = props;

  const eventComponents = sub_component_data.map((item, index) => {
    const edgeItemStyle = { ...(index === 0 && { paddingLeft: 20 }), ...(index === (sub_component_data.length - 1) && {paddingRight: 20 }) }
    
    return (
      <Stack key={index} style={edgeItemStyle} direction="column" alignItems="center" spacing={1.5}>
        <Card
          sx={{
            maxWidth: 300,
            borderRadius: '10px',
            boxShadow: 'none',
          }}
        >
          <CardMedia
            component="img"
            aria-label={`image ${index}`}
            sx={{ width: 300, height: 200, objectFit: 'cover' }}
            image={item.image}
          />
        </Card>
      </Stack>
    )
  });

  return (
    <BasicContainer id={id} style={{marginRight: 0, marginLeft: 0}}>
      <Carousel items={eventComponents} />
    </BasicContainer>
  );
};

export default CardViewCarouselComponent;
