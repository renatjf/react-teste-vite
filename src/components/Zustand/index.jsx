import { Zustand } from "./Zustand";
import { CodigoExemplo } from "../CodigoExemplo/CodigoExemplo";
import codigoZustand from "./Zustand.jsx?raw";
import codigoStore from "./store.js?raw";

export function IndexZustand() {
  return (
    <>
      <div>
        <Zustand />
      </div>
      <CodigoExemplo
        arquivos={[
          { nome: "Zustand.jsx", codigo: codigoZustand },
          { nome: "store.js", codigo: codigoStore },
        ]}
      />
    </>
  );
}
