import { slowCypressDown } from 'cypress-slow-down'

slowCypressDown();

describe("renders the home page", () => {
    beforeEach(() => {
        // load the home page
        cy.visit("/");
    });

  it("renders correctly", () => {
    

    //check if the given text included in this page
    cy.contains("Fast Fueler");

    let test_username = "6345263462";
    let test_password = "Abcd@1234";
    let test_wrong_fuel_amount = -12;
    let test_fuel_amount = 10;

    // login as a fuel station
    cy.get(".MuiTypography-alignRight > .MuiTypography-root").click();
    
    // enter username and password
    cy.get("#regNo").type(test_username).should("have.value", test_username);
    cy.get("#password").type(test_password).should("have.value", test_password);

    // click login button
    cy.get(".MuiButton-root").click();

    cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardActions-root > .MuiButtonBase-root').click();

    cy.get("#amount").type(test_wrong_fuel_amount).should("have.value", test_wrong_fuel_amount);

    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    cy.get("#amount").clear();

    cy.get("#amount").type(test_fuel_amount).should("have.value", test_fuel_amount);

    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();




  });
});
