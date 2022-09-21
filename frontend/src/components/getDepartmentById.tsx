import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDepartmentById, deleteDepartmentById, getEmployeesByDepartmentId } from "../apiClient";
import Container from "react-bootstrap/esm/Container";
import "../css/getDepartmentById.css";
import { Button } from "react-bootstrap";
import { confirm } from "react-confirm-box";
import { Employee } from "../models/employeeModel";
import { Department } from "../models/departmentModels";
import { EmployeeDepartmentTable } from "./employeeDepartmentTable";

export const GetDepartmentById = () => {
  const params = useParams();
  const department_id = params.id;
  const [department, setDepartment] = useState<any>({});
  const [error, setError] = useState("");
  const options = {
    labels: {
      confirmable: "Yes",
      cancellable: "No"
    }
  };
  const [employees, setEmployees] = useState<Employee>();
  const navigate = useNavigate();

  useEffect(() => {
    getDepartmentById(Number(department_id)).then((response) =>
      setDepartment(response.department));
    getEmployeesByDepartmentId(Number(department_id)).then((response) =>
      setEmployees(response));
  }, []);

  if (department.created_at) {
    department.created_at = department.created_at.split("T")[0];
  }

  if (department.updated_at) {
    department.updated_at = department.updated_at.split("T")[0];
  }

  const deleteDepartment = async () => {
      const result = await confirm(`Are you sure you want to delete ${department.department_name}?`, options);
      if (result) {
        deleteDepartmentById(Number(department_id)).then((response) => {
          if (response.success === true) {
            navigate("/");
          } else {
            setError("You can't delete department with employees");
          }
        });
      }
      else {
        navigate(`/department/${department_id}`);
      }
  };

  const updateDepartment = () => {
    getDepartmentById(Number(department_id)).then((response) =>
      navigate(`/department/${department_id}/update`)
    );
  };
  return (
    <div>
      <Container  >
        <div>
          <img className="department-image" src={department.image} />
          
          <h4>{department.department_name}</h4>
          <br/>
          {department.count === 1 ? <p>There is {department.count} employee in this department</p> : 
           <p>There are {department.count} employees in this department</p>}
           <p>Department average salary is £{department.avg}</p>
         
        </div>
        <p className="created_at">Department was created on {department.created_at}</p>
        {department.updated_at ? (
          <p className="created_at">Updated on {department.updated_at}</p>
        ) : (
          ""
        )}

        <div className="d-flex flex-row">
          <div>
            <Button className="btn btn-success my-4" onClick={updateDepartment}>
              Update
            </Button>
          </div>
          <div>
            <Button className="mx-2 my-4" onClick={deleteDepartment}>
              Delete
            </Button>
          </div>
        </div>
        <br />
        <EmployeeDepartmentTable employees={employees} />
        <br />
        <Link to={`/department/${department_id}/employee/create`} className="link">
          {" "}
          Add employee to {department.department_name}
        </Link>
        <br />
      </Container>
    </div>
  );
};
