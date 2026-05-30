import { useState } from "react";
import { Menu } from "./components/Menu";
import { IndexProps } from "./components/Props";
import { IndexPropsUserState } from "./components/PropsUserState";

export function App() {
  const [ativo, setAtivo] = useState(null);

  return (
    <>
      <Menu setAtivo={setAtivo} />

      <div className="conteudo">
        {ativo === "indexProps" && <IndexProps />}
        {ativo === "indexPropsUserState" && <IndexPropsUserState />}
      </div>
    </>
  );
}
