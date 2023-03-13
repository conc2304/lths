import { createTheme } from '@mui/material/styles';

const Palette = (mode) => {
   
    return createTheme({
        palette: {
           
            mode,
            primary:{
                main:'#3D4752'
            },
            secondary: {
                main: "#e6f4ff",
                contrastText: "#1677ff "
              },
              
            
           
        }
    });
};

export default Palette;
