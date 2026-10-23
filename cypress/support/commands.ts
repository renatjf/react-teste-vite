Cypress.Commands.add("selecionarExemplo", (nome: string) => {
  cy.get(".menu a")
    .filter((_, element) => element.textContent?.trim() === nome)
    .click();
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      selecionarExemplo(nome: string): void;
    }
  }
}

export {};
