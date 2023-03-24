import { DashThemeProvider as MMSThemeProvider} from '@lths-mui/shared/mui-themes';

const withMMSThemeProvider = (Story, context) => {
  return (
    <MMSThemeProvider>
      <Story />
    </MMSThemeProvider>
  );
};

const withTestingMount = (Story) => (
  <div id="component-test-mount-point">
    <Story />
  </div>
)

export const decorators = [withMMSThemeProvider, withTestingMount];
export const parameters = {};
export const globalTypes = {};
