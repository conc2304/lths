import { ReactNode, useMemo } from 'react';

import { CssBaseline, Theme } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import getPalette from './palette';
import getTypography from './typography';
import getComponentOverrides from './overrides/index';

type Props = {
    children : ReactNode;
}

export default function DashThemeProvider({ children }: Props) {
    const theme = getPalette();

    const themeTypography = getTypography(`'Public Sans', sans-serif`);

    const themeOptions: Theme = useMemo(
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
            palette: theme.palette,
            ...themeTypography
        }),
        [theme, themeTypography]
    );

    const themes = createTheme(themeOptions);
    themes.components= getComponentOverrides(themes);

    return (<ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>);
}


