import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getDepartmentById,
  deleteDepartmentById,
  getEmployeesByDepartmentId,
} from "../apiClient";
import Container from "react-bootstrap/esm/Container";
import "../css/getDepartmentById.css";
import { Button } from "react-bootstrap";
import { confirm } from "react-confirm-box";
import { Employee } from "../models/employeeModel";
import { DepartmentEmployee } from "../models/departmentModels";
import { EmployeeDepartmentTable } from "./employeeDepartmentTable";
import { MenuDepartment } from "./navbarDepartment";

export const GetDepartmentById = () => {
  const params = useParams();
  const department_id = params.id;
  const [department, setDepartment] = useState<DepartmentEmployee>();
  const [error, setError] = useState("");
  const options = {
    labels: {
      confirmable: "Yes",
      cancellable: "No",
    },
  };

  const [employees, setEmployees] = useState<Employee[]>();
  const navigate = useNavigate();

  useEffect(() => {
     getDepartmentById(Number(department_id)).then((response) => {
      if (response.department.created_at) {
        response.department.created_at =
          response.department.created_at.split("T")[0];
      }

      if (response.department.updated_at) {
        response.department.updated_at =
          response.department.updated_at.split("T")[0];
      }

      setDepartment(response.department);
      getEmployeesByDepartmentId(Number(department_id)).then((response) =>
        setEmployees(response.employees)
      );
    });
  }, []);

  const deleteDepartment = async () => {
    if (department) {
      const result = await confirm(
        `Are you sure you want to delete ${department.department_name}?`,
        options
      );
      if (result) {
        deleteDepartmentById(Number(department_id)).then((response) => {
          if (response.success === true) {
            navigate("/");
          } else {
            setError("You can't delete department with employees");
          }
        });
      } else {
        navigate(`/department/${department_id}`);
      }
    } else {
      setError("You can't delete department with employees");
    }
  };

  const updateDepartment = () => {
    getDepartmentById(Number(department_id)).then((_response) => {
      navigate(`/department/${department_id}/update`);
    });
  };

  const routeChange = ()=> {
    navigate(`/department/${department_id}/employee/create`);
  }

  if (department === undefined) {
    return <div>Loading report ...</div>;
  } else {
    return (
      <div>
        <Container>
          <MenuDepartment />
          <div className="get-department-container">
            <header className="header-container">
              <img className="department-image" src={department.image} />
              <h2 className="title">{department.department_name}</h2>
            </header>
          
            {department.count === 1 ? 
              (<div><p>There is {department.count} employee in this department</p>
              <p>Department average salary is £{department.avg}</p></div>)
             : (department.count === 0 ? 
              <p>There are no employees in this department</p>
             : 
             (<div><p>There are {department.count} employees in this department</p>
             <p>Department average salary is £{department.avg}</p></div>)
            )}
            
          <p className="created_at">
            Department was created on {department.created_at}
          </p>
          {department.updated_at ? (
            <p className="created_at">Updated on {department.updated_at}</p>
          ) : (
            ""
          )}

          {department.count === 0 ? "" : <EmployeeDepartmentTable employees={employees} />}
         
          </div>
        </Container>
      </div>
    );
  }
};
