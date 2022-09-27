import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/employeeTable.css";

export const EmployeeDepartmentTable = ({ employees }) => {
  if (employees === undefined) {
    return <div style={{ color: "red" }}>Loading data ... </div>;
  }
  if (employees.length === 0) {
    return <div style={{ color: "red" }}>There are no employees</div>;
  }
  if (!Array.isArray(employees)) {
    return <div style={{ color: "red" }}>There are no employees</div>;
  }
  return (
    <div className="table-container">
        <h4>Employees</h4>
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <th>Name</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Role</th>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <Link to={`/employee/${employee.id}`} className="link">
                  {employee.name}
                </Link>
              </td>
              <td>
                  {employee.gender}
              </td>
              <td>
                  {employee.age}
              </td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
};
