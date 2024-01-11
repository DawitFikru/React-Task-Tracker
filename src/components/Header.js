import Button from "./Button";

function Header({ title, onAdd, showAdd }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={
          showAdd
            ? "red"
            : "green" /* if the showAdd prop is true then it will be red otherwise green */
        }
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
    </header>
  );
}

export default Header;
