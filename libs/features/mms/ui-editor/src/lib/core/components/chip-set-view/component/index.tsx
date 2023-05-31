
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';

import {
  BasicContainer,
} from '../../../../elements';
import { ChipSetViewComponentProps } from '../../types';

const ChipSetViewComponent = (props: ChipSetViewComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { title, component_data },
  } = props;

  interface CustomChipProps {
    selected?: boolean;
    [key: string]: any;
  }
  
  const CustumChip: React.FC<CustomChipProps> =  ({ selected = false, ...props }) => {
    const backgroundColor = selected ? '#ba9765' : '#faf8f3';
    const textColor = selected ? '#f5f0e9' : "#ba9765"
    return (
      <Chip
        {...props}
        variant="outlined"
        sx={{ 
          margin: 0,
          backgroundColor: backgroundColor,
          borderColor: '#ba9765',
          color: textColor,
          "& .MuiChip-label": {
            paddingRight: "16px",
            paddingLeft: "16px",
            textTransform: "none"
          }
        }}
      />
    );
  };
  

  return (
    <BasicContainer id={id}>
      <Box
        sx={{
          backgroundColor: '#faf8f3',
          padding: '16px',
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Grid container spacing={1.1}>
          {component_data.map(({ title }, index) => {
            return (
              <Grid item >
                <CustumChip label={title} selected={index === 0}/>
              </Grid>
            );
          })} 
        </Grid>
      </Box>
    </BasicContainer>
  );
};
export default ChipSetViewComponent;
