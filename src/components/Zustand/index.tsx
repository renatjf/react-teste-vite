import { Zustand } from "./Zustand";
import { CodigoExemplo } from "../CodigoExemplo/CodigoExemplo";
import codigoZustand from "./Zustand.tsx?raw";
import codigoStore from "./store.ts?raw";

export function IndexZustand() {
  return (
    <>
      <div>
        <Zustand />
      </div>
      <CodigoExemplo
        arquivos={[
          { nome: "Zustand.tsx", codigo: codigoZustand },
          { nome: "store.ts", codigo: codigoStore },
        ]}
      />
    </>
  );
}
