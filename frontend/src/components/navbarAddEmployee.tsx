import "../css/navbar.css";

export function MenuAddEmployee ({departmentImage}) {
  return (
    <nav id="navBar">
        <img className="department-image" src={departmentImage} />
      <div id="navigation">
        <a href="/">
          <span>Departments</span>
        </a>
        <a href={`/employee`}>
          <span>Employees</span>
        </a>
      </div>
    </nav>
  );
}
