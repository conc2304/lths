import * as React from 'react';
import 'cypress-react-selector';

const rootToMountSelector = '#component-test-mount-point';

describe('shared-ui-elements: Date Range Input', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=daterangeselector--primary');
    cy.get(rootToMountSelector);
    cy.waitForReact(1000, rootToMountSelector);
  });

  afterEach(() => {
    cy.document().then((doc) => {
      // ReactDOM.unmountComponentAtNode(doc.querySelector(rootToMountSelector))
    });
  });

  it('should render the root component, button group, and date pickers', () => {
    cy.get('.LthsDateRangeSelector-root').should('exist');
  });

  it('should render the MUI ToggleButtonGroup Lths', () => {
    cy.get('.Lths-Button-Group').should('exist');
  });

  it('should render 2 MUI DatePicker Components group', () => {
    cy.get('.Lths-Date-Picker').should('have.length', 2);
  });


  it('should set selected toggle on click, and unset selected toggle button after selecting custom date', () => {
    cy.get('.MuiButtonBase-root').first().as('button');
    cy.get('input.MuiInputBase-input').first().as('input');
    cy.get('.MuiInputAdornment-root button.MuiButtonBase-root').first().as('calenderButton');

    cy.get('@input').should('have.value', '');
    cy.get('@button').should('not.have.class', 'Mui-selected');
    cy.get('@button').click();
    cy.get('@button').should('have.class', 'Mui-selected');

    cy.get('@calenderButton').click();
    cy.get('button[data-timestamp].MuiPickersDay-root').first().click()

    cy.get('@button').should('not.have.class', 'Mui-selected');
  });

  it('should clear the date input fields when a date option is selected', () => {
    cy.get('.MuiButtonBase-root').first().as('button');
    cy.get('input.MuiInputBase-input').first().as('input1');
    cy.get('input.MuiInputBase-input').last().as('input2');

    cy.get('@input1').invoke('val', '03 / 15 / 2023').trigger('change');
    cy.get('@input2').invoke('val', '03 / 16 / 2023').trigger('change');

    cy.get('@input1').should('have.value', '03 / 15 / 2023');
    cy.get('@input2').should('have.value', '03 / 16 / 2023');

    cy.get('@button').click();
    cy.get('@button').should('have.class', 'Mui-selected');
    cy.get('@input1').should('have.value', '');
    cy.get('@input2').should('have.value', '');
  });
});
