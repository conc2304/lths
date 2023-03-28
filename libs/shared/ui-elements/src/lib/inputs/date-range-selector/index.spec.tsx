import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { cleanup, render, RenderResult, screen } from '@testing-library/react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import { DateRangeSelector } from './index';
import { ButtonGroupConf, now } from './mockButtonRanges';

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
      // Arrange
      const { baseElement } = themedComponent;
      // Act
      // Assert
      expect(baseElement).toBeTruthy();
    });

    it('matches the snapshot', () => {
      // Arrange
      const { baseElement } = themedComponent;
      // Act
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    it('should render the correct number of toggle buttons, labels, and values', () => {
      // Arrange
      const { container } = themedComponent;
      // Act

      // Assert
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
      // Arrange
      // Act
      // Assert
      expect(
        screen.queryAllByLabelText('start', { selector: '.MuiFormLabel-root' })
      ).toBeTruthy();
      expect(
        screen.queryAllByLabelText('end', { selector: '.MuiFormLabel-root' })
      ).toBeTruthy();
    });

    it('should initialize with no options selected', () => {
      // Arrange
      const { container } = themedComponent;
      const inputFields = container.querySelectorAll('.MuiInputBase-input');
      // Act

      // Assert
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
      inputFields.forEach((inputElem) => {
        expect(inputElem).toHaveValue('');
      });
    });

    it('should initialize the date picker using enUS locale settings', () => {
      // Arrange
      const { container } = themedComponent;
      const expectedPaceHolder = 'MM / DD / YYYY';
      const inputFields = container.querySelectorAll('.MuiInputBase-input');
      // Act
      // Assert
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
    // Arrange
    cleanup();
    const user = userEvent.setup();
    render(RBThemeProvider({ children: component }));
    const buttonTested = ButtonGroupConf[2];

    const buttonElem = screen.queryByText(buttonTested.label, {
      selector: '.MuiButtonBase-root',
    });

    // verify before state before click
    expect(buttonElem).toHaveAttribute('aria-pressed', 'false');
    expect(buttonElem).toHaveAttribute('aria-selected', 'false');
    expect(buttonElem).not.toHaveClass('Mui-selected');

    // Act
    if (buttonElem) {
      await user.click(buttonElem);
    }

    // Assert
    expect(buttonElem).toBeTruthy();
    expect(buttonElem).toHaveAttribute('aria-pressed', 'true');
    expect(buttonElem).toHaveAttribute('aria-selected', 'true');
    expect(buttonElem).toHaveClass('Mui-selected');
  });

  it.only('should call the onChange prop after a user selects a date range', async () => {
    // Arrange
    cleanup();
    const user = userEvent.setup();
    render(RBThemeProvider({ children: component }));
    const buttonTested = ButtonGroupConf[2];
    const beforeClickTime = new Date();

    const buttonElem = screen.queryByText(buttonTested.label, {
      selector: '.MuiButtonBase-root',
    });

    // Act
    if (buttonElem) {
      await user.click(buttonElem);
    }

    // Assert
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        startDate: buttonTested.value,
        endDate: expect.any(Date), // end date is set to now, so just make sure its a valid date
      })
    );
  });
});
