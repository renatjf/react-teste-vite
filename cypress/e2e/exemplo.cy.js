describe("App de exemplos React", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renderiza o menu com todas as opções", () => {
    cy.get(".menu a").should("have.length", 15);
    cy.contains(".menu a", "Apollo Client").should("be.visible");
  });

  it("quebra o menu em 6 colunas em telas grandes", () => {
    cy.viewport(1280, 800);

    cy.get(".menu ul").should(($menu) => {
      const columns = getComputedStyle($menu[0]).gridTemplateColumns.split(" ");
      expect(columns).to.have.length(6);
    });
  });

  it("navega para useState e interage com o contador", () => {
    cy.selecionarExemplo("useState");

    cy.contains("h1", "Exemplos de useState").should("be.visible");
    cy.contains("button", "+1").click();
    cy.contains("p", "Valor:").should("contain.text", "1");
  });

  it("navega para useEffect", () => {
    cy.selecionarExemplo("useEffect");

    cy.contains("h1", "Exemplos de useEffect").should("be.visible");
  });

  it("navega para Apollo Client", () => {
    cy.selecionarExemplo("Apollo Client");

    cy.contains("h1", "Exemplos de Apollo Client").should("be.visible");
  });
});
