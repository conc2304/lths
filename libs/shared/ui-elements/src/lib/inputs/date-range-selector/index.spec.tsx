import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import { DateRangeSelector } from './index';
import { ButtonGroupConf } from './mock-button-ranges';

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

  describe('User Interactions', () => {
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

    it('should call the onChange prop after a user selects a date range', async () => {
      // Arrange
      cleanup();
      const user = userEvent.setup();
      const onChange = jest.fn();
      component = (
        <DateRangeSelector dateOptions={ButtonGroupConf} onChange={onChange} />
      );
      themedComponent = render(RBThemeProvider({ children: component }));

      const buttonTested = ButtonGroupConf[2];
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

    xit('should unset the selected button when user enters a custom date range and back', async () => {
      // bypassing this test
      // unable to get mui date picker to trigger an onchange event neither through clicking nor text input
      // which then unsets the selected button group

      cleanup();
      const user = userEvent.setup();
      const { container, baseElement } = render(
        RBThemeProvider({ children: component })
      );
      const buttonTested = ButtonGroupConf[2];
      const buttonElem = screen.queryByText(buttonTested.label, {
        selector: '.MuiButtonBase-root',
      });
      // const startDateInput = (await screen.findByLabelText(
      //   'START'
      // )) as HTMLInputElement;

      // expect(startDateInput).toBeTruthy();
      // screen.debug(startDateInput);

      const calButton = baseElement.querySelector(
        'button.MuiButtonBase-root[aria-label="Choose date"'
      ) as HTMLButtonElement;

      expect(calButton).toBeTruthy();
      screen.debug(calButton);

      // Assert
      if (buttonElem) {
        await user.click(buttonElem);
      }

      expect(buttonElem).toHaveClass('Mui-selected');

      // Act
      await act(async () => {
        // user.click(calButton)
        fireEvent.click(calButton);
      });
      const dayPickerButton = baseElement.querySelector(
        'button.MuiPickersDay-root'
      ) as HTMLButtonElement;
      screen.debug(dayPickerButton);
      console.log(dayPickerButton);
      await act(async () => {
        fireEvent.click(dayPickerButton);
      });

      // user.type(startDateInput, '03 / 08 / 2021');
      // await act(async () => {
      //   // const chosenDate = await screen.findByRole('gridcell', { name: '8' });
      //   // expect(chosenDate).toBeTruthy()
      //   // fireEvent.click(chosenDate);
      //   fireEvent.input(startDateInput, { target: { value: '03 / 08 / 2021' } });
      //   fireEvent.change(startDateInput, { target: { value: '03 / 08 / 2021' } });
      //   expect(startDateInput).toHaveValue('03 / 08 / 2021');
      // });

      // if (calendarButton && dateButton && dateInput) {
      //   console.log(calendarButton);
      //   console.log(dateButton);
      //   await user.click(calendarButton);
      //   await user.click(dateButton);
      //   dateInput?.setAttribute('value', '03 / 14 / 2021');
      //   fireEvent.input(dateInput, { target: { value: '03 / 14 / 2021' } });
      //   fireEvent.change(dateInput, { target: { value: '03 / 14 / 2021' } });
      //   // this is not triggering the date picker's on change events
      // }

      // Assert
      expect(buttonElem).not.toHaveClass('Mui-selected');
    });
  });
});
