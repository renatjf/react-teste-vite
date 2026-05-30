export function Menu({ setAtivo }) {
  return (
    <div className="menu">
      <ul>
        <li>
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
        <li>
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
      </ul>
    </div>
  );
}
