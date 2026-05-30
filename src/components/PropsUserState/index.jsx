import { useState } from "react";
import { PropsUserState } from "./Props-userState";
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
    </>
  );
}
