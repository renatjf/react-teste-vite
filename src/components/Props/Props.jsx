export function Props({ title, description, label, onClick, disabled }) {
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
