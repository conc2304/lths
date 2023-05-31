import { Grid, Button, Stack, Typography } from '@mui/material';

import { MOBILE_SCREEN_WIDTH } from '../../../../common';
import { HeroContainer } from '../../../../elements';
import { ButtonsViewComponentProps } from '../../types';

const ButtonsViewComponent = (props: ButtonsViewComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { title, desc, image, component_data },
  } = props;

  const colors = { brand: { primary: '#111921', secondary: '#BA9765' }, text: '#ffffff' };
  const height = 690;

  const handleClick = (index: number) => {
    window.open(component_data[index].action.page_link, '_blank');
  };

  return (
      <HeroContainer id={id} width={MOBILE_SCREEN_WIDTH} height={height} image={image} disableGutter>
      <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
        <Typography
          sx={{ paddingTop: 10.8, paddingLeft: 0.8, paddingRight: 5, lineHeight: 1.3, fontSize: 34, fontWeight: 600, color: '#ffffff', wordWrap: 'break-word' }}
        >
          {title}
        </Typography>
        <Grid container spacing={0.7}>
          {component_data.map(({ title }, index) => {
            return (
              <Grid item >
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleClick(index)}
                    sx={{
                      minWidth: "64px", minHeight: "40px",
                      paddingX: '0.2rem', paddingY: '0.35rem',
                      backgroundColor: '#BA9765', color: colors.text,
                      '&:hover': {
                        backgroundColor: '#BA9765',
                      },
                    }}
                  >
                    {title}
                  </Button>
              </Grid>
            );
          })} 
        </Grid>
        <Typography
          variant="body2"
          style={{
            paddingTop: 12,
            color: '#ffffff',
          }}
        >
          {desc}
        </Typography>
      </Stack>
    </HeroContainer>
  );
};
export default ButtonsViewComponent;
