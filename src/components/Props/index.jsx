import { useState } from "react";
import { Props } from "./Props";
import { CodigoExemplo } from "../CodigoExemplo/CodigoExemplo";
import codigoIndex from "./index.jsx?raw";
import codigoProps from "./Props.jsx?raw";

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
          { nome: "Props.jsx", codigo: codigoProps },
          { nome: "index.jsx", codigo: codigoIndex },
        ]}
      />
    </>
  );
}
