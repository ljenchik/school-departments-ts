import { useParams } from "react-router-dom";
import "../css/navbar.css";

export function MenuDepartment() {
    const params = useParams();
    const department_id = params.id;
  return (
    <nav id="navBar">
      <div id="navigation">
        <a href="/">
          <span>Departments</span>
        </a>
        <a href={`/department/${department_id}/employee/create`}>
          <span>Add employee</span>
        </a>
        <a href={`/department/${department_id}/update`}>
          <span>Edit department</span>
        </a>
        <a href="/department/delete">
          <span>Delete department</span>
        </a>
      </div>
    </nav>
  );
}
