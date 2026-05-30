export function PropsUserState({ visivel, title }) {
  if (!visivel) return null;

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
