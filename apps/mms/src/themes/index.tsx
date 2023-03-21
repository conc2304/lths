import { ReactNode, useMemo } from 'react';

import { CssBaseline, Theme, ThemeOptions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import getPalette from './palette';
import getTypography from './typography';
import getComponentOverrides from './overrides/index';

type Props = {
    children : ReactNode;
}

export default function DashThemeProvider({ children }: Props) {
    const themePalette = getPalette();
    const themeTypography = getTypography(`'Public Sans', sans-serif`);

    const themeOptions: ThemeOptions = useMemo(
        () => ({
            breakpoints: {
                values: {
                    xs: 0,
                    sm: 768,
                    md: 1024,
                    lg: 1266,
                    xl: 1536
                }
            },
            direction: 'ltr',
            mixins: {
                // layout header settings
                toolbar: {
                    minHeight: 50,
                    paddingTop: 4,
                    paddingBottom: 4
                },
            },
            palette: themePalette,
            typography: themeTypography
        }),
        [themePalette, themeTypography]
    );

    console.log('themeOptions')
    console.log(themeOptions.palette.info)
    const themes = createTheme(themeOptions);
    themes.components= getComponentOverrides(themes);

    console.log(' provider')
    console.log(themes.palette.info)
    console.log(themes)
    return (<ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>);
}


