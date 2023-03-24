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

  it("should set selected class after selecting a date range from the button group", () => {
    cy.get(".MuiButtonBase-root").first().as("button");

    cy.get("@button").should("exist");
    cy.get("@button").should("not.have.class", "Mui-selected");
    cy.get("@button").click();
    cy.get("@button").should("have.class", "Mui-selected");
    cy.getReact("DateRangeSelector")
      .getCurrentState()
      .should("have.property", "dateOptionGroupValue", "2");

    // cy.get('@button')
    //   .invoke('val')
    //   .then((buttonValue) => {
    //     // do more work here
    //     console.log('HERE')
    //     console.log('buttonValue', buttonValue)
    //     console.log('HERE')
    //     cy.getReact('DateRangeSelector').getCurrentState().should('have.property', 'dateOptionGroupValue', buttonValue)

    //   });
  });
});
