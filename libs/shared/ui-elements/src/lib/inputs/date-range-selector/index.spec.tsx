import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import { DateRangeSelector } from './index';
import { ButtonGroupConf } from './mockButtonRanges';

describe('Date Range Selector', () => {
  let themedComponent: RenderResult;
  let component: JSX.Element;

  beforeEach(() => {
    const component = (
      <DateRangeSelector
        dateOptions={ButtonGroupConf}
        onChange={({ startDate, endDate }) =>
          console.log('changed', { startDate, endDate })
        }
      />
    );
    themedComponent = render(RBThemeProvider({ children: component }));
  });
  it('should render', () => {
    const { baseElement } = themedComponent;
    expect(baseElement).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const { baseElement } = themedComponent;
    expect(baseElement).toMatchSnapshot();
  });
});
