import { useState } from "react";
import { Props } from "./Props";
import { CodigoExemplo } from "../CodigoExemplo/CodigoExemplo";
import codigoIndex from "./index.tsx?raw";
import codigoProps from "./Props.tsx?raw";

export function IndexProps() {
  const [label, setLabel] = useState("Clique aqui");
  const [description, setDescription] = useState("Descrição do props comum");

  return (
    <>
      <div>
        <Props
          title="Props comum"
          description={description}
          label={label}
          onClick={() => {
            setLabel("Clicado!");
            setDescription("Descrição atualizada!");
          }}
          disabled={false}
        />
      </div>
      <CodigoExemplo
        arquivos={[
          { nome: "Props.tsx", codigo: codigoProps },
          { nome: "index.tsx", codigo: codigoIndex },
        ]}
      />
    </>
  );
}
