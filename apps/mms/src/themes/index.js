import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import getPalette from './palette';
import getTypography from './typography';
import getOverrides from './overrides';


export default function DashThemeProvider({ children }) {
    const theme = getPalette();

    const themeTypography = getTypography(`'Public Sans', sans-serif`);

    const themeOptions = useMemo(
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
            typography: themeTypography
        }),
        [theme, themeTypography]
    );

    const themes = createTheme(themeOptions);
    themes.components= getOverrides(themes);

    console.log('themes.components')
    console.log(themes.components)

    return (<ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>);
}

DashThemeProvider.propTypes = {
    children: PropTypes.node
};
