Cypress.Commands.add("selecionarExemplo", (nome) => {
  cy.get(".menu a")
    .filter((_, element) => element.textContent.trim() === nome)
    .click();
});
