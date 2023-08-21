import { CssBaseline, ThemeProvider } from '@mui/material';
import { RBTheme } from '@lths-mui/shared/themes';
import { withKnobs, select } from "@storybook/addon-knobs";

const themes = { 'Regatta Bay': RBTheme };
const themeNames = Object.keys(themes);

const withThemeSelector = (Story) => {
  const theme = select(
    "Theme",
    themeNames,
    themeNames[0],
    "Themes"
  );

  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};



const withTestingMount = (Story) => (
  <div id="component-test-mount-point">
    <Story />
  </div>
)

export const decorators = [withKnobs, withThemeSelector, withTestingMount];
export const parameters = {};
export const globalTypes = {};