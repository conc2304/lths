import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { IOSSwitch } from './IOS-style';

describe('IOSSwitch', () => {
  const renderWithTheme = (component: JSX.Element) => {
    return render(RBThemeProvider({ children: component }));
  };

  it('renders with default props', () => {
    const { container } = renderWithTheme(<IOSSwitch />);

    const switchBase = container.querySelector('.MuiSwitch-switchBase');
    const thumb = container.querySelector('.MuiSwitch-thumb');
    const track = container.querySelector('.MuiSwitch-track');

    expect(switchBase).toBeInTheDocument();
    expect(thumb).toBeInTheDocument();
    expect(track).toBeInTheDocument();
  });

  it('renders with checked prop', () => {
    const { container } = renderWithTheme(<IOSSwitch checked />);

    const switchBase = container.querySelector('.MuiSwitch-switchBase.Mui-checked');
    const thumb = container.querySelector('.MuiSwitch-thumb');
    const track = container.querySelector('.MuiSwitch-track');

    expect(switchBase).toBeInTheDocument();
    expect(thumb).toBeInTheDocument();
    expect(track).toBeInTheDocument();
  });
});
