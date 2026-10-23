interface PropsProps {
  title: string;
  description: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Props({ title, description, label, onClick, disabled }: PropsProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={onClick} disabled={disabled}>
        {label}
      </button>
    </div>
  );
}
