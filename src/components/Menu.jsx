export function Menu({ setAtivo, ativo }) {
  return (
    <div className="menu">
      <ul>
        <li className={ativo === "indexProps" ? "ativo" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAtivo("indexProps");
            }}
          >
            Props
          </a>
        </li>
        <li className={ativo === "indexPropsUserState" ? "ativo" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAtivo("indexPropsUserState");
            }}
          >
            Props com useState
          </a>
        </li>
        <li className={ativo === "indexZustand" ? "ativo" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAtivo("indexZustand");
            }}
          >
            Zustand
          </a>
        </li>
        <li className={ativo === "indexZustandAPI" ? "ativo" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAtivo("indexZustandAPI");
            }}
          >
            Zustand API
          </a>
        </li>
        <li className={ativo === "indexDesignPatterns" ? "ativo" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAtivo("indexDesignPatterns");
            }}
          >
            Design Patterns
          </a>
        </li>
        <li className={ativo === "indexUserLayoutEffect" ? "ativo" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAtivo("indexUserLayoutEffect");
            }}
          >
            useLayoutEffect
          </a>
        </li>
        <li className={ativo === "indexUseMemo" ? "ativo" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAtivo("indexUseMemo");
            }}
          >
            useMemo
          </a>
        </li>
        <li className={ativo === "indexUseEffectApi" ? "ativo" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAtivo("indexUseEffectApi");
            }}
          >
            useEffect API
          </a>
        </li>
        <li className={ativo === "indexUseEffect" ? "ativo" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAtivo("indexUseEffect");
            }}
          >
            useEffect
          </a>
        </li>
        <li className={ativo === "indexUseState" ? "ativo" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAtivo("indexUseState");
            }}
          >
            useState
          </a>
        </li>
        <li className={ativo === "indexUseReducer" ? "ativo" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAtivo("indexUseReducer");
            }}
          >
            useReducer
          </a>
        </li>
        <li className={ativo === "indexUseRef" ? "ativo" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAtivo("indexUseRef");
            }}
          >
            useRef
          </a>
        </li>
        <li className={ativo === "indexUseCallback" ? "ativo" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAtivo("indexUseCallback");
            }}
          >
            useCallback
          </a>
        </li>
        <li className={ativo === "indexUseContext" ? "ativo" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAtivo("indexUseContext");
            }}
          >
            useContext
          </a>
        </li>
        <li className={ativo === "indexApolloClient" ? "ativo" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAtivo("indexApolloClient");
            }}
          >
            Apollo Client
          </a>
        </li>
      </ul>
    </div>
  );
}
