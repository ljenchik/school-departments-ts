import React, { useEffect, useState } from "react";
import { getAllEmployees, getAllEmployeesByDob } from "../apiClient";
import Container from "react-bootstrap/esm/Container";
import { getAllDepartments } from "../apiClient";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../css/getAllEmployees.css";
import { Employee } from "../models/employeeModel";
import { Department } from "../models/departmentModels";
import { EmployeeTableDOB } from "./employeeTableDOB";
import { useSearchParams } from "react-router-dom";

export const GetAllEmployees = () => {
  const [employeesByDob, setEmployeesByDob] = useState<Employee[]>();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentName, setDepartmentName] = useState<string>();
  const [isDisabled, setDisabled] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [startDate, setStartDate] = useState<any>(searchParams.get("from"));
  const [endDate, setEndDate] = useState<any>(searchParams.get("to"));

  const navigate = useNavigate();

  const handleChangeDepartment = (event: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setDepartmentName(event.target.value);
  };

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

  const handleChangeStartDate = (event: {
    target: { value: string | Date };
  }) => {
    try {
      const start = new Date(event.target.value).toISOString().slice(0, 10);
      setStartDate(start);
    } catch (err) {
      setStartDate("dd/mm/yyyy");
    }
    setDisabled(false);
  };

  const handleChangeEndDate = (event: { target: { value: string | Date } }) => {
    try {
      const end = new Date(event.target.value).toISOString().slice(0, 10);
      setEndDate(end);
    } catch (err) {
      setEndDate("dd/mm/yyyy");
    }
    setDisabled(false);
  };

  const search = () => {
   
    if (startDate && endDate) {
      setSearchParams({from:startDate, to: endDate});
    } else  if (endDate) {
      setSearchParams({to: endDate});
    } else  if (startDate) {
      setSearchParams({from: startDate});
    } else {
      setSearchParams({});
    }
    setDisabled(true);
    
  };

  useEffect(() => {
    getAllDepartments().then((response) =>
      setDepartments(response.departments)
    );
  }, []);

  useEffect(() => {
    let start = searchParams.get("from") ?? "1900-01-01";
    let end = searchParams.get("to") ?? "3000-01-01";

    getAllEmployeesByDob(start, end).then((response) => {
      setEmployeesByDob(response.employees);
    });

    setStartDate(searchParams.get("from"))
    console.log("searchParamsFrom", searchParams.get("from"));
    setEndDate(searchParams.get("to"))
    console.log("startDate", startDate)
  }, [searchParams]);

  const reset = () => {
    getAllEmployees().then((response) => {
      setStartDate(null);
      console.log(startDate)
      setEndDate("dd/mm/yyyy");
      setSearchParams({});
      setDisabled(true);
    });
  };

  return (
    <Container>
      <h3 className="title">Employees</h3>
      <label className="add-dep-label">
        Filter employees by date of birth from
      </label>
      <input type="date" onChange={handleChangeStartDate} value={startDate} />
      <label className="add-dep-label">to</label>
      <input type="date" onChange={handleChangeEndDate} value={endDate} />
      <Button
        className="btn btn-success my-3 mx-2 custom"
        onClick={search}
        disabled={isDisabled}
      >
        Search
      </Button>

      <Button className="btn btn-success my-3 mx-2 custom" onClick={reset}>
        Reset
      </Button>
      <EmployeeTableDOB employees={employeesByDob} />
      <br />
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

      <Button className="btn btn-success my-3 mx-2 custom" onClick={submit}>
        Submit
      </Button>
    </Container>
  );
};
