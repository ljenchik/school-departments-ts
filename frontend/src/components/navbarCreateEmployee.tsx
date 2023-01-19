import "../css/navbar.css";

export function MenuAddEmployee ({departmentImage, department_id, department_name}) {
  return (
    <nav id="navBar">
      <a href={`/department/${department_id}`}>
        <img className="department-image" src={departmentImage} />
      </a>
      <div id="navigation">
        <a href="/">
          <span>Departments</span>
        </a>
        <a href={`/employee`}>
          <span>Employees</span>
        </a>
        <a href={`/department/${department_id}`}>
          <span>{department_name}</span>
        </a>
      </div>
    </nav>
  );
}
