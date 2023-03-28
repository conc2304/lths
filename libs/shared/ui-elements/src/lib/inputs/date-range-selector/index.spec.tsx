import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { cleanup, render, RenderResult, screen } from '@testing-library/react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import { DateRangeSelector } from './index';
import { ButtonGroupConf } from './mockButtonRanges';

const setup = (jsx: JSX.Element) => ({
  user: userEvent.setup(),
  ...render(jsx),
});
describe('Date Range Selector', () => {
  let themedComponent: RenderResult;
  let component: JSX.Element;
  const onChange = jest.fn();

  beforeEach(() => {
    component = (
      <DateRangeSelector dateOptions={ButtonGroupConf} onChange={onChange} />
    );
    themedComponent = render(RBThemeProvider({ children: component }));
  });

  afterEach(() => {
    cleanup();
  });
  describe('Component Rendering and Initialization', () => {
    it('should render', () => {
      const { baseElement } = themedComponent;
      expect(baseElement).toBeTruthy();
    });

    it('matches the snapshot', () => {
      const { baseElement } = themedComponent;
      expect(baseElement).toMatchSnapshot();
    });

    it('should render the correct number of toggle buttons, labels, and values', () => {
      const { container } = themedComponent;
      expect(
        container.querySelectorAll('.Lths-Button-Group .MuiButtonBase-root')
          .length
      ).toBe(ButtonGroupConf.length);

      ButtonGroupConf.forEach((button) => {
        const buttonElem = screen.queryByText(button.label, {
          selector: '.MuiButtonBase-root',
        });
        expect(buttonElem).toBeTruthy();
        expect(buttonElem).toHaveAttribute('value', button.value.toString());
      });
    });

    it('should render 2 Date Picker components', () => {
      expect(
        screen.queryAllByLabelText('start', { selector: '.MuiFormLabel-root' })
      ).toBeTruthy();
      expect(
        screen.queryAllByLabelText('end', { selector: '.MuiFormLabel-root' })
      ).toBeTruthy();
    });

    it('should initialize with no options selected', () => {
      const { container } = themedComponent;

      ButtonGroupConf.forEach((button) => {
        const buttonElem = screen.queryByText(button.label, {
          selector: '.MuiButtonBase-root',
        });
        if (buttonElem) {
          expect(buttonElem).toHaveAttribute('aria-pressed', 'false');
          expect(buttonElem).toHaveAttribute('aria-selected', 'false');
          expect(buttonElem).not.toHaveClass('Mui-selected');
        }
      });
      const inputFields = container.querySelectorAll('.MuiInputBase-input');
      inputFields.forEach((inputElem) => {
        expect(inputElem).toHaveValue('');
      });
    });

    it('should initialize the date picker using enUS locale settings', () => {
      const { container } = themedComponent;
      const expectedPaceHolder = 'MM / DD / YYYY';

      "⁦⁨MM⁩ / ⁨DD⁩ / ⁨YYYY⁩⁩"

      const inputFields = container.querySelectorAll('.MuiInputBase-input');
      inputFields.forEach((inputElem) => {
        expect(
          inputElem
            .getAttribute('placeholder')
            ?.toString()
            .replace(/[\u2066-\u2069]*/g, '')
        ).toBe(expectedPaceHolder);
      });
    });
  });

  it('should update the toggle group button selected state on click', async () => {
    // const { user } = setup(themedComponent);
    cleanup();
    // const component = (
    //   <DateRangeSelector dateOptions={ButtonGroupConf} onChange={onChange} />
    // );
    const user = userEvent.setup()
    render(RBThemeProvider({ children: component }));
    const buttonTested = ButtonGroupConf[2];

    const buttonElem = screen.queryByText(buttonTested.label, {
      selector: '.MuiButtonBase-root',
    });

    expect(buttonElem).toBeTruthy();
    // verify before state before click
    expect(buttonElem).toHaveAttribute('aria-pressed', 'false');
    expect(buttonElem).toHaveAttribute('aria-selected', 'false');
    expect(buttonElem).not.toHaveClass('Mui-selected');
    if (buttonElem) {
      await user.click(buttonElem);
    }

    const buttonElemAfterClick = screen.queryByText(buttonTested.label, {
      selector: '.MuiButtonBase-root',
    });

    expect(buttonElemAfterClick).toBeTruthy();
    expect(buttonElemAfterClick).toHaveAttribute('aria-pressed', 'true');
    expect(buttonElemAfterClick).toHaveAttribute('aria-selected', 'true');
    expect(buttonElemAfterClick).toHaveClass('Mui-selected');
  });
});
