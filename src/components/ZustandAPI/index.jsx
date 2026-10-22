import { ZustandAPI } from "./ZustandAPI";
import { CodigoExemplo } from "../CodigoExemplo/CodigoExemplo";
import codigoZustandAPI from "./ZustandAPI.jsx?raw";
import codigoStore from "./store.js?raw";

export function IndexZustandAPI() {
  return (
    <>
      <CodigoExemplo
        titulo="Como foi feito (código):"
        arquivos={[
          { nome: "ZustandAPI.jsx", codigo: codigoZustandAPI },
          { nome: "store.js", codigo: codigoStore },
        ]}
      />
      <div>
        <ZustandAPI />
      </div>
    </>
  );
}
