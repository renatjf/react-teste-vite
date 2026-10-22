import { useState } from "react";
import { PropsUserState } from "./Props-userState";
import { CodigoExemplo } from "../CodigoExemplo/CodigoExemplo";
import codigoIndex from "./index.jsx?raw";
import codigoPropsUserState from "./Props-userState.jsx?raw";

export function IndexPropsUserState() {
  const [visivel, setVisivel] = useState(false);

  return (
    <>
      <div>
        <div>
          <h1>Props com useState</h1>
        </div>{" "}
        <PropsUserState visivel={visivel} title="Estou visivel" />
        <button onClick={() => setVisivel((v) => !v)}>
          {visivel ? "Esconder" : "Mostrar"}
        </button>
      </div>
      <CodigoExemplo
        arquivos={[
          { nome: "Props-userState.jsx", codigo: codigoPropsUserState },
          { nome: "index.jsx", codigo: codigoIndex },
        ]}
      />
    </>
  );
}
