import React, { useEffect, useState } from "react";
import { getAllEmployees, getAllEmployeesByDob } from "../apiClient";
import { GetEmployeeTable } from "./getEmployeeTable";
import Container from "react-bootstrap/esm/Container";
import { getAllDepartments } from "../apiClient";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../css/getAllEmployees.css";
import { Employee } from "../responseModels/employeeModel";
import { Department } from "../responseModels/departmentModel";

export const GetAllEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>();

  useEffect(() => {
    getAllEmployees().then((response) => setEmployees(response.employees));
    console.log(employees);
  }, []);

  return (
    <Container>
        <h3 className="title">Employees</h3>
        <GetEmployeeTable employees={employees} />
    </Container>
  );
};
