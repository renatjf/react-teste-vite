import { ZustandAPI } from "./ZustandAPI";
import { CodigoExemplo } from "../CodigoExemplo/CodigoExemplo";
import codigoZustandAPI from "./ZustandAPI.tsx?raw";
import codigoStore from "./store.ts?raw";

export function IndexZustandAPI() {
  return (
    <>
      <CodigoExemplo
        titulo="Como foi feito (código):"
        arquivos={[
          { nome: "ZustandAPI.tsx", codigo: codigoZustandAPI },
          { nome: "store.ts", codigo: codigoStore },
        ]}
      />
      <div>
        <ZustandAPI />
      </div>
    </>
  );
}
