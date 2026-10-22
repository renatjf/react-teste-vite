import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Zustand } from "./Zustand";
import { useContadorStore } from "./store";

describe("Zustand Store", () => {
  beforeEach(() => {
    useContadorStore.setState({ contador: 0 });
  });

  it("inicia com contador igual a 0", () => {
    const { contador } = useContadorStore.getState();
    expect(contador).toBe(0);
  });

  it("incrementa o contador", () => {
    useContadorStore.getState().incrementar();
    const { contador } = useContadorStore.getState();
    expect(contador).toBe(1);
  });

  it("decrementa o contador", () => {
    useContadorStore.getState().decrementar();
    const { contador } = useContadorStore.getState();
    expect(contador).toBe(-1);
  });

  it("reseta o contador para 0", () => {
    useContadorStore.getState().incrementar();
    useContadorStore.getState().incrementar();
    useContadorStore.getState().resetar();
    const { contador } = useContadorStore.getState();
    expect(contador).toBe(0);
  });
});

describe("Zustand Component", () => {
  beforeEach(() => {
    useContadorStore.setState({ contador: 0 });
  });

  it("renderiza o titulo e o valor inicial do contador", () => {
    render(<Zustand />);
    expect(screen.getByText("Zustand")).toBeInTheDocument();
    expect(screen.getByTestId("contador")).toHaveTextContent("0");
  });

  it("incrementa ao clicar no botao incrementar", () => {
    render(<Zustand />);
    fireEvent.click(screen.getByTestId("incrementar"));
    expect(screen.getByTestId("contador")).toHaveTextContent("1");
  });

  it("decrementa ao clicar no botao decrementar", () => {
    render(<Zustand />);
    fireEvent.click(screen.getByTestId("decrementar"));
    expect(screen.getByTestId("contador")).toHaveTextContent("-1");
  });

  it("reseta o contador ao clicar no botao resetar", () => {
    render(<Zustand />);
    fireEvent.click(screen.getByTestId("incrementar"));
    fireEvent.click(screen.getByTestId("incrementar"));
    fireEvent.click(screen.getByTestId("resetar"));
    expect(screen.getByTestId("contador")).toHaveTextContent("0");
  });
});
