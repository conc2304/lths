import { PaletteMode } from '@mui/material';
import { createTheme, Theme } from '@mui/material/styles';

const Palette = (mode: PaletteMode = 'light'): Theme => {

    return createTheme({
        palette: {
            mode,
            primary: {
                // main:'#3D4752'
                main: '#3D4752'
            },
            secondary: {
                main: "#e6f4ff",
                contrastText: "#1677ff "
            },
        }
    });
};

export default Palette;
