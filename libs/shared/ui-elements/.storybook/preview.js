import { DashThemeProvider as MMSThemeProvider} from '@lths-mui/shared/mui-themes';

const withMMSThemeProvider = (Story, context) => {
  return (
    <MMSThemeProvider>
      <Story />
    </MMSThemeProvider>
  );
};

export const decorators = [withMMSThemeProvider];
export const parameters = {};
export const globalTypes = {};
