import { useState } from "react";
import { Menu } from "./components/Menu";
import { IndexProps } from "./components/Props";
import { IndexPropsUserState } from "./components/PropsUserState";
import { IndexZustand } from "./components/Zustand";
import { IndexZustandAPI } from "./components/ZustandAPI";
import { IndexDesignPatterns } from "./components/DesignPatterns";
import { IndexUserLayoutEffect } from "./components/UserLayoutEffect";
import { IndexUseMemo } from "./components/UseMemo";
import { IndexUseEffectApi } from "./components/UseEffectApi";
import { IndexUseEffect } from "./components/UseEffect";
import { IndexUseState } from "./components/UseState";
import { IndexUseReducer } from "./components/UseReducer";
import { IndexUseRef } from "./components/UseRef";
import { IndexUseCallback } from "./components/UseCallback";
import { IndexUseContext } from "./components/UseContext";
import { IndexApolloClient } from "./components/ApolloClient";

export function App() {
  const [ativo, setAtivo] = useState(null);

  return (
    <>
      <Menu setAtivo={setAtivo} ativo={ativo} />

      <div className="container">
        {ativo === "indexProps" && <IndexProps />}
        {ativo === "indexPropsUserState" && <IndexPropsUserState />}
        {ativo === "indexZustand" && <IndexZustand />}
        {ativo === "indexZustandAPI" && <IndexZustandAPI />}
        {ativo === "indexDesignPatterns" && <IndexDesignPatterns />}
        {ativo === "indexUserLayoutEffect" && <IndexUserLayoutEffect />}
        {ativo === "indexUseMemo" && <IndexUseMemo />}
        {ativo === "indexUseEffectApi" && <IndexUseEffectApi />}
        {ativo === "indexUseEffect" && <IndexUseEffect />}
        {ativo === "indexUseState" && <IndexUseState />}
        {ativo === "indexUseReducer" && <IndexUseReducer />}
        {ativo === "indexUseRef" && <IndexUseRef />}
        {ativo === "indexUseCallback" && <IndexUseCallback />}
        {ativo === "indexUseContext" && <IndexUseContext />}
        {ativo === "indexApolloClient" && <IndexApolloClient />}
      </div>
    </>
  );
}
