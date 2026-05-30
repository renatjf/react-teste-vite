import { useState } from "react";
import { Props } from "./Props";
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
    </>
  );
}
