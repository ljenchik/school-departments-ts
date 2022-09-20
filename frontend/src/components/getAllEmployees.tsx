import React, { useEffect, useState } from "react";
import { getAllEmployees} from "../apiClient";
import { GetEmployeeTable } from "./getEmployeeTable";
import Container from "react-bootstrap/esm/Container";
import { getAllDepartments } from "../apiClient";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../css/getAllEmployees.css";
import { Employee } from "../models/employeeModel";
import { Department } from "../models/departmentModels";

export const GetAllEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentName, setDepartmentName] = useState<string>();
  const navigate = useNavigate();

  const handleChangeDepartment = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
    setDepartmentName(event.target.value);
  };

  useEffect(() => {
    getAllEmployees().then((response) => setEmployees(response.employees));
    getAllDepartments().then((response) => setDepartments(response.departments));
  }, []);


  const submit = () => {
    for (let i = 0; i < departments.length; i++) {
      if (departments[i].department_name === departmentName) {
        navigate(`/department/${departments[i].id}/employee/create`);
      }
      if (departmentName === "Add department") {
        navigate(`/department/create`);
      }
    }
  };

  const reset = () => {
    getAllEmployees().then((response) => {
      setEmployees(response.employees);
      //setSearchTableDisplay(false);
      //setStartDate('dd/mm/yyyy');
      //setEndDate('dd/mm/yyyy');
      //setDisabled(true);
    });
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      submit();
    }
  };


  return (
    <Container>
        <h3 className="title">Employees</h3>
        <GetEmployeeTable employees={employees} />

        <label className="add-dep-label">Add employee to department</label>
          <select
            className="select-department"
            value={departmentName}
            onChange={handleChangeDepartment}
          >
            <option>Choose department</option>
            {departments.map((department) => (
              <option>{department.department_name}</option>
            ))}
            <option>Add department</option>
          </select>

          <Button
            className="btn btn-success my-3 mx-2"
            onClick={submit}
          >
            Submit
          </Button>

    </Container>
  );
};
