import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/employeeTable.css";

export const EmployeeTable = ({ employees, location }) => {
  if (employees === undefined) {
    return <div style={{ color: "red" }}>Loading data ... </div>;
  }
  if (employees.length === 0 || !Array.isArray(employees)) {
    return <div style={{ color: "red" }}>There are no employees</div>;
  }
  
  return (
    <div className="table-container">
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <th>Name</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Department</th>
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

              <td>
                <Link
                  to={{
                    pathname:`/department/${employee.department_id}` 
                  }}
                  state={{from: 'asdfadf'}}
                  className="link"
                >
                  {employee.department_name}
                </Link>
              </td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
};
