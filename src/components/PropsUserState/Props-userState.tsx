interface PropsUserStateProps {
  visivel: boolean;
  title: string;
}

export function PropsUserState({ visivel, title }: PropsUserStateProps) {
  if (!visivel) return null;

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
