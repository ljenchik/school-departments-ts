import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import "../css/employeeTable.css";


// const getAge = (dateString: string) => 
// {
//     var today = new Date();
//     var birthDate = new Date(dateString);
//     var age = today.getFullYear() - birthDate.getFullYear();
//     var m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
//     {
//         age--;
//     }
//     return age;
// }

export const EmployeeTable = ({ employees }) => {
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
                  to={`/department/${employee.department_id}`}
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
